import { SlotInput } from '../domain/models/interfaces/iSlot';
import { BadRequestError, NotFoundError } from '../infrastructure/express/errors';
import { IParkingLotSetup, ParkingLotInput } from '../domain/models/interfaces/iParkingLot';
import { IParkingLotRepository } from '../domain/repositories/interfaces/iParkingLotRepository';
import parkingLotRepo from '../domain/repositories/parkingLot';
import { ISlotController } from './interfaces/slot';
import slotController from './slot';
import { IVehicleTypeController } from './interfaces/vehicleType';
import vehicleTypeController from './vehicleType';
import { IParkingLotController } from './interfaces/parkingLot';
import bunyan from 'bunyan';

const logger = bunyan.createLogger({ name: 'ParkingLotController' });

class ParkingLotController implements IParkingLotController {
  parkingLotRepo: IParkingLotRepository;

  slotControl: ISlotController;
  vehicleTypeControl: IVehicleTypeController;

  constructor(
    parkingLotRepo: IParkingLotRepository,
    slotControl: ISlotController,
    vehicleTypeControl: IVehicleTypeController,
  ) {
    this.parkingLotRepo = parkingLotRepo;
    this.slotControl = slotControl;
    this.vehicleTypeControl = vehicleTypeControl;
  }

  create(parkingLot: ParkingLotInput) {
    return this.parkingLotRepo.persist(parkingLot);
  }

  search(parkingLotId: number) {
    return this.parkingLotRepo.fetch(parkingLotId);
  }

  async update(id: number, parkingLotInput: ParkingLotInput) {
    const parkingLot = await parkingLotController.search(id);

    if (!parkingLot) {
      throw new NotFoundError('Parking lot not found');
    }

    return this.parkingLotRepo.update(id, parkingLotInput);
  }

  async setup(id: number, slotsSetup: IParkingLotSetup[]) {
    const parkingLot = await parkingLotController.search(id);

    if (!parkingLot) {
      throw new NotFoundError('Parking lot not found');
    }

    if (!slotsSetup || slotsSetup.every((setup) => !setup.quantity)) {
      throw new BadRequestError('You must create a few slots');
    }
    if (slotsSetup.some((setup) => setup.quantity > 1000)) {
      throw new BadRequestError('Maximum slots to be created at once is 1000');
    }

    logger.info(`[setup] Setting up slots for parking lot ${id}`, slotsSetup);

    const parkingSlots: SlotInput[] = [];
    // TODO: CREATE SLOTS BY BATCHES AND REMOVE LIMIT ABOVE
    slotsSetup.map((slotSetup) => {
      const { vehicleTypeId, quantity } = slotSetup;
      const slotsToAdd = new Array(quantity).fill(1);
      slotsToAdd.map(() => {
        parkingSlots.push({
          vehicleTypeId,
          parkingLotId: id,
          status: 'available',
        });
      });
    });

    return this.slotControl.create(parkingSlots);
  }
}

const parkingLotController = new ParkingLotController(parkingLotRepo, slotController, vehicleTypeController);
export default parkingLotController;
