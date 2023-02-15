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

    if (filter?.id) {
      slotBuilder.where('id', filter?.id);
    }

    if (typeof filter?.inUse === 'boolean') {
      slotBuilder.withGraphFetched('parking');

      if (filter?.inUse) {
        slotBuilder.where((internalBuilder) =>
          internalBuilder
            .whereNotNull('parking.checkin_at')
            .andWhere('parking.checkout_at', null)
        );
      } else {
        slotBuilder.where((internalBuilder) =>
          internalBuilder
            .whereNull('parking.slot_id')
            .orWhereNotNull('parking.checkout_at')
            .groupBy(['slots.id', 'parking.id', 'vehicleType.id'])
            .having(raw(`count(parking.slot_id) = 0`))
        );
      }
    }

    if (filter?.vehiclesTypesIds) {
      slotBuilder.whereIn('vehicle_type_id', filter?.vehiclesTypesIds);
    }

    return slotBuilder
      .select()
      .withGraphJoined('vehicleType')
      .orderBy('vehicleType.order', filter?.order || 'asc')
      .orderBy('slots.id', 'asc')
      .debug();
  }

  async remove(id: number): Promise<ISlot[]> {
    await Slot.query().deleteById(id);
    return this.fetch({ inUse: true });
  }
}

const slotRepo = new SlotRepository();
export default slotRepo;
