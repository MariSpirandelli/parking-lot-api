import { SlotInput, ISlot, ISlotFilter } from '../models/interfaces/iSlot';
import { Slot } from '../models/slot';
import { ISlotRepository } from './interfaces/iSlotRepository';

class SlotRepository implements ISlotRepository {
  async persist(slot: SlotInput[]): Promise<ISlot[]> {
    return await Slot.query().insert(slot).returning('*');
  }

  async update(id: number, slot: Partial<SlotInput>): Promise<ISlot[]> {
    return await Slot.query().update(slot).where({ id }).returning('*');
  }

  async updateMany(ids: number[], properties: Partial<SlotInput>): Promise<ISlot[]> {
    return await Slot.query().update(properties).whereIn('id', ids).returning('*');
  }

  async fetch(filter?: ISlotFilter): Promise<ISlot[]> {
    const slotBuilder = Slot.query()
      .withGraphJoined('vehicleType')
      .orderBy('vehicleType.order', filter?.order || 'asc')
      .orderBy('slots.id', 'asc');

    if (filter?.id) {
      slotBuilder.where('id', filter.id);
    }

    if (typeof filter?.inUse === 'boolean') {
      if (filter.inUse) {
        slotBuilder.where('status', 'occupied');
      } else {
        slotBuilder.where('status', 'available');
      }
    }

    if (filter?.vehiclesTypesIds) {
      slotBuilder.whereIn('vehicle_type_id', filter.vehiclesTypesIds);
    }

    if (filter?.parkingLotId) {
      slotBuilder.where('parking_lot_id', filter.parkingLotId);
    }

    return slotBuilder.select();
  }

  async remove(id: number, parkingLotId: number): Promise<ISlot[]> {
    await Slot.query().deleteById(id);
    return this.fetch({ inUse: true, parkingLotId });
  }
}

const slotRepo = new SlotRepository();
export default slotRepo;
