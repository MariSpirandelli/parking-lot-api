import { raw } from 'objection';
import { IDashboardSummary } from '../models/interfaces/iDashboard';
import {
  ParkingInput,
  IParking,
  IParkingFilter,
  ParkingCheckout,
} from '../models/interfaces/iParking';
import { Parking } from '../models/parking';
import { Slot } from '../models/slot';
import { VehicleType } from '../models/vehicleType';
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

    if (filter?.parkingLotId) {
      parkingBuilder
        .withGraphJoined('slot')
        .where('slot.parking_lot_id', filter.parkingLotId);
    }

    if (filter?.id) {
      parkingBuilder.where('id', filter?.id);
    }

    if (filter?.inUse) {
      parkingBuilder.whereNull('checkout_at');
    }
    if (filter?.slotId) {
      parkingBuilder.where('slot_id', filter?.slotId);
    }
    if (filter?.vehicleId) {
      parkingBuilder.where('vehicle_id', filter?.vehicleId);
    }

    return parkingBuilder.select();
  }

  async remove(vehicleId: number, parkingLotId: number): Promise<IParking[]> {
    await Parking.query()
      .update({ checkoutAt: new Date().toISOString() })
      .where('vehicle_id', vehicleId)
      .whereNull('checkout_at');

    return this.fetch({ inUse: true, parkingLotId });
  }

  async getSummary(parkingLotId: number): Promise<IDashboardSummary> {
    const summaryPromise = Slot.query()
      .where('parking_lot_id', parkingLotId)
      .select(
        raw(`
            sum(case when status = 'available' then 1 end) as remaining
      `),
      )
      .first();

    const vehicleSummaryPromise = VehicleType.query()
      .where('parking_lot_id', parkingLotId)
      .whereNull('parkings.checkout_at')
      .select(
        raw(`vehicle_types.type
        , count(parkings.id) as parked
      `),
      )
      .leftJoin('vehicles', 'vehicles.vehicle_type_id', 'vehicle_types.id')
      .leftJoin('parkings', 'vehicles.id', 'parkings.vehicle_id')
      .leftJoin('slots', 'parkings.slot_id', 'slots.id')
      .groupBy(['vehicle_types.type']);

    const [summary, vehicleSummary] = await Promise.all([summaryPromise, vehicleSummaryPromise]);

    const vehicles: any = {};
    vehicleSummary?.map((vehicle: any) => {
      const { type, parked } = vehicle;
      vehicles[type] = { parked };
    });

    return {
      remaining: (summary as any).remaining,
      ...vehicles,
    };
  }
}

const parkingRepo = new ParkingRepository();
export default parkingRepo;
