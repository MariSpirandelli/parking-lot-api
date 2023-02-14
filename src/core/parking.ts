import { ISlot } from '../domain/models/interfaces/iSlot';
import { NotFoundError } from '../infrastructure/express/errors/notFound';
import {
  IParking,
  IParkingFilter,
  ParkingCheckin,
  ParkingInput,
} from '../domain/models/interfaces/iParking';
import { IParkingRepository } from '../domain/repositories/interfaces/iParkingRepository';
import parkingRepo from '../domain/repositories/parking';
import { IParkingController } from './interfaces/parking';
import { ISlotController } from './interfaces/slot';
import { IVehicleController } from './interfaces/vehicle';
import slotController from './slot';
import vehicleController from './vehicle';
import { IParkingLotController } from './interfaces/parkingLot';
import parkingLotController from './parkingLot';

class ParkingController implements IParkingController {
  parkingRepo: IParkingRepository;

  parkingLotControl: IParkingLotController;
  slotControl: ISlotController;
  vehicleControl: IVehicleController;

  constructor(
    parkingRepo: IParkingRepository,
    slotControl: ISlotController,
    vehicleControl: IVehicleController,
    parkingLotControl: IParkingLotController
  ) {
    this.parkingRepo = parkingRepo;
    this.slotControl = slotControl;
    this.vehicleControl = vehicleControl;
    this.parkingLotControl = parkingLotControl;
  }

  async create(parking: ParkingInput) {
    const { slotId, vehicleId } = parking;

    const slot = await slotController.search({ id: slotId });

    if (!slot) {
      throw new NotFoundError('Slot not found');
    }

    const vehicle = await vehicleController.search({ id: vehicleId });

    if (!vehicle) {
      throw new NotFoundError('Vehicle not found');
    }

    return this.parkingRepo.persist(parking);
  }

  search(parkingfilters?: IParkingFilter) {
    return this.parkingRepo.fetch(parkingfilters);
  }

  async update(id: number, parkingInput: ParkingInput) {
    const parking = await this.search({ id });
    if (!parking) {
      throw new NotFoundError('Parking not found');
    }
    return this.parkingRepo.update(id, parkingInput);
  }

  async park(parking: ParkingCheckin): Promise<ISlot[]> {
    const { parkingLotId, vehicleId } = parking;

    const parkingLot = await parkingLotController.search(parkingLotId);

    if (!parkingLot) {
      throw new NotFoundError('Parking lot not found');
    }

    const vehicle = await vehicleController.search({ id: vehicleId });

    if (!vehicle) {
      throw new NotFoundError('Parking lot not found');
    }

    const availableSlots = await this.slotControl.getAvailable(
      vehicle.vehicleTypeId
    );

    if (!availableSlots) {
      throw new Error(
        `Parking lot reached maximum limit for ${vehicle.type.type}`
      );
    }

    const parkingSpaces = availableSlots.map((slot) => {
      return {
        slotId: slot.id,
        vehicleId,
      };
    });

    await this.parkingRepo.saveAll(parkingSpaces);

    return availableSlots;
  }

  async remove(id: number): Promise<IParking[]> {
    return this.parkingRepo.update(id, {
      checkoutAt: new Date().toISOString(),
    });
  }
}

const parkingController = new ParkingController(
  parkingRepo,
  slotController,
  vehicleController,
  parkingLotController
);
export default parkingController;
