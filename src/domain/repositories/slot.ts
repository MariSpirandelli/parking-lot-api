import { raw } from 'objection';
import { SlotInput, ISlot, ISlotFilter } from '../models/interfaces/iSlot';
import { Slot } from '../models/slot';
import { ISlotRepository } from './interfaces/iSlotRepository';

class SlotRepository implements ISlotRepository {
  async persist(slot: SlotInput[]): Promise<ISlot[]> {
    return await Slot.query().insert(slot).returning('*');
  }

  async update(id: number, slot: SlotInput): Promise<ISlot[]> {
    return await Slot.query().update(slot).where({ id }).returning('*');
  }

  async fetch(filter?: ISlotFilter): Promise<ISlot[]> {
    const slotBuilder = Slot.query();

    if (filter.id) {
      slotBuilder.where('id', filter.id);
    }

    if (!!filter.inUse && filter.inUse) {
      slotBuilder.withGraphFetched('parking').whereNull('parking.checkout_at');
    }

    if (!!filter.inUse && !filter.inUse) {
      slotBuilder.withGraphFetched('parking').whereNotNull('parking.checkout_at').having(raw(`count(parking.slotId) = 0`));
    }

    if (filter.vehicleTypeId) {
      slotBuilder.where('vehicle_type_id', filter.vehicleTypeId);
    }

    return slotBuilder.select().orderBy('id');
  }

  async remove(id: number): Promise<ISlot[]> {
    await Slot.query().deleteById(id);
    return this.fetch({ inUse: true });
  }
}

const slotRepo = new SlotRepository();
export default slotRepo;
