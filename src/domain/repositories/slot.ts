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

    if (!!filter.inUse) {
      slotBuilder.withGraphFetched('parking');

      if (filter.inUse) {
        slotBuilder.whereNull('parking.checkout_at');
      } else {
        slotBuilder
          .whereNotNull('parking.checkout_at')
          .having(raw(`count(parking.slotId) = 0`));
      }
    }

    if (filter.vehiclesTypesIds) {
      slotBuilder.whereIn('vehicle_type_id', filter.vehiclesTypesIds);
    }

    return slotBuilder.select().orderBy('id', filter.order || 'asc');
  }

  async remove(id: number): Promise<ISlot[]> {
    await Slot.query().deleteById(id);
    return this.fetch({ inUse: true });
  }
}

const slotRepo = new SlotRepository();
export default slotRepo;
