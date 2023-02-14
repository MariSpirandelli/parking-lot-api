import parkingSlotFactory from '../business/factories/parkingSlotFactory';
import {
  ISlot,
  ISlotFilter,
  SlotInput,
} from '../domain/models/interfaces/iSlot';
import { ISlotRepository } from '../domain/repositories/interfaces/iSlotRepository';
import slotRepo from '../domain/repositories/slot';
import { ISlotController } from './interfaces/slot';
import { IVehicleTypeController } from './interfaces/vehicleType';
import vehicleTypeController from './vehicleType';

class SlotController implements ISlotController {
  slotRepo: ISlotRepository;

  vehicleTypeControl: IVehicleTypeController;

  constructor(
    slotRepo: ISlotRepository,
    vehicleTypeControl: IVehicleTypeController
  ) {
    this.slotRepo = slotRepo;
    this.vehicleTypeControl = vehicleTypeControl;
  }

  create(slot: SlotInput[]) {
    return this.slotRepo.persist(slot);
  }

  search(slotfilters: ISlotFilter) {
    return this.slotRepo.fetch(slotfilters);
  }

  update(id: number, slot: SlotInput) {
    return this.slotRepo.update(id, slot);
  }

  async getAvailable(vehicleTypeId: number): Promise<ISlot[]> {
    const vehicleTypes = await this.vehicleTypeControl.search();

    const vehicleType = vehicleTypes.filter(
      (item) => item.id === vehicleTypeId
    )[0];

    const parkingSlot = parkingSlotFactory.getParkingSlotByVehicleType(
      vehicleType.type,
    );

    return parkingSlot.defineSlotToPark(vehicleTypes);
  }
}

const slotController = new SlotController(slotRepo, vehicleTypeController);
export default slotController;
