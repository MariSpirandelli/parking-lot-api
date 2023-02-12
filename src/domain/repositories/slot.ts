import { SlotInput, ISlot, ISlotFilter } from '../models/interfaces/iSlot';
import { Slot } from '../models/slot';
import { ISlotRepository } from './interfaces/iSlotRepository';

class SlotRepository implements ISlotRepository {
  async persist(slot: SlotInput): Promise<ISlot> {
    return await Slot.query().insert(slot).returning('*');
  }

  async update(id: number, slot: SlotInput): Promise<ISlot[]> {
    return await Slot.query().update(slot).where({ id }).returning('*');
  }

  async fetch(filter?: ISlotFilter): Promise<ISlot[]> {
    const slotBuilder = Slot.query();

    if (filter.inUse) {
      slotBuilder.withGraphFetched('parking').whereNull('parking.checkout_at');
    }

    if (filter.vehicleTypeId) {
      slotBuilder.where('vehicle_type_id', filter.vehicleTypeId);
    }

    return slotBuilder.select();
  }

  async remove(id: number): Promise<ISlot[]> {
    await Slot.query().deleteById(id);
    return this.fetch({ inUse: true });
  }
}

const slotRepo = new SlotRepository();
export default slotRepo;
