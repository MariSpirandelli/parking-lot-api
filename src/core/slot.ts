import {
  ISlotFilter,
  SlotInput,
} from '../domain/models/interfaces/iSlot';
import { ISlotRepository } from '../domain/repositories/interfaces/iSlotRepository';
import slotRepo from '../domain/repositories/slot';
import { ISlotController } from './interfaces/slot';

class SlotController implements ISlotController{
  slotRepo: ISlotRepository;

  constructor(slotRepo: ISlotRepository) {
    this.slotRepo = slotRepo;
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
}

const slotController = new SlotController(slotRepo);
export default slotController;
