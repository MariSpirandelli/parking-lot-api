import { InternalError, NotFoundError } from '../infrastructure/express/errors';
import { IParking, IParkingFilter, ParkingCheckin, ParkingInput } from '../domain/models/interfaces/iParking';
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
    parkingLotControl: IParkingLotController,
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
    const parking = await this.search({
      id,
    });
    if (!parking) {
      throw new NotFoundError('Parking not found');
    }
    return this.parkingRepo.update(id, parkingInput);
  }

  async park(parking: ParkingCheckin): Promise<IParking[]> {
    const { parkingLotId, vehicleId } = parking;

    const parkingLot = await parkingLotController.search(parkingLotId);

    if (!parkingLot) {
      throw new NotFoundError('Parking lot not found');
    }

    const vehicle = await vehicleController.search({ id: vehicleId });

    if (!vehicle) {
      throw new NotFoundError('Parking lot not found');
    }

    let availableSlots = [];

    availableSlots = await this.slotControl.getAvailable(vehicle.vehicleTypeId, parkingLotId);

    if (!availableSlots) {
      throw new InternalError(`Parking lot reached maximum limit for ${vehicle.type.type}`);
    }

    const slotsIds = [];
    const parkingSpaces = availableSlots.map((slot) => {
      slotsIds.push(slot.id);

      return {
        slotId: slot.id,
        vehicleId,
      };
    });

    const [parkings] = await Promise.all([
      this.parkingRepo.saveAll(parkingSpaces),
      this.slotControl.setAvailablility(slotsIds, 'occupied'),
    ]);

    return parkings;
  }

  async remove(vehicleId: number, parkingLotId: number): Promise<IParking[]> {
    const occupiedSlots = await this.parkingRepo.fetch({
      vehicleId,
      inUse: true,
    });
    if (!occupiedSlots?.length) {
      throw new NotFoundError('Vehicle not parked');
    }

    const slotsIds = occupiedSlots.map((parking) => parking.slotId);

    await this.slotControl.setAvailablility(slotsIds, 'available');

    return this.parkingRepo.remove(vehicleId, parkingLotId);
  }
}

const parkingController = new ParkingController(parkingRepo, slotController, vehicleController, parkingLotController);
export default parkingController;
