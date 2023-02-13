import {
  ParkingInput,
  IParking,
  IParkingFilter,
  ParkingCheckout,
} from '../models/interfaces/iParking';
import { Parking } from '../models/parking';
import { IParkingRepository } from './interfaces/iParkingRepository';

class ParkingRepository implements IParkingRepository {
  async persist(parking: ParkingInput): Promise<IParking> {
    return await Parking.query().insert(parking).returning('*');
  }

  async saveAll(parking: ParkingInput[]): Promise<IParking[]> {
    return await Parking.query().insert(parking).returning('*');
  }

  async update(
    id: number,
    parking: ParkingInput | ParkingCheckout
  ): Promise<IParking[]> {
    return await Parking.query().update(parking).where({ id }).returning('*');
  }

  async fetch(filter?: IParkingFilter): Promise<IParking[]> {
    const parkingBuilder = Parking.query();

    if (filter.id) {
      parkingBuilder.where('id', filter.id);
    }

    if (filter.inUse) {
      parkingBuilder.whereNull('checkout_at');
    }
    if (filter.slotId) {
      parkingBuilder.where('slot_id', filter.slotId);
    }
    if (filter.vehicleId) {
      parkingBuilder.where('vehicle_id', filter.vehicleId);
    }

    return parkingBuilder.select();
  }

  async remove(id: number): Promise<IParking[]> {
    await Parking.query().deleteById(id);
    return this.fetch({ inUse: true });
  }
}

const parkingRepo = new ParkingRepository();
export default parkingRepo;
