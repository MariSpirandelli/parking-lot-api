import { ParkingLotInput, IParkingLot } from '../models/interfaces/iParkingLot';
import { ParkingLot } from '../models/parkingLot';
import { IParkingLotRepository } from './interfaces/IParkingLotRepository';

class ParkingLotRepository implements IParkingLotRepository {
  async persist(parkingLot: ParkingLotInput): Promise<IParkingLot> {
    return await ParkingLot.query().insert(parkingLot).returning('*');
  }

  async update(
    id: number,
    parkingLot: ParkingLotInput
  ): Promise<IParkingLot[]> {
    return await ParkingLot.query()
      .update(parkingLot)
      .where({ id })
      .returning('*');
  }
}

const parkingLotRepo = new ParkingLotRepository();
export default parkingLotRepo;
