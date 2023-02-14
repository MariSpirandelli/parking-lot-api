import {
  VehicleTypeInput,
  IVehicleType,
} from '../models/interfaces/iVehicleType';
import { VehicleType } from '../models/vehicleType';
import { IVehicleTypeRepository } from './interfaces/iVehicleTypeRepository';

class VehicleTypeRepository implements IVehicleTypeRepository {
  async persist(vehicleType: VehicleTypeInput): Promise<IVehicleType> {
    return await VehicleType.query().insert(vehicleType).returning('*');
  }

  async update(
    id: number,
    vehicleType: VehicleTypeInput
  ): Promise<IVehicleType[]> {
    return await VehicleType.query()
      .update(vehicleType)
      .where({ id })
      .returning('*');
  }

  async fetch(): Promise<IVehicleType[]> {
    return VehicleType.query().select().orderBy('order');
  }

  async remove(id: number): Promise<IVehicleType[]> {
    await VehicleType.query().deleteById(id);
    return this.fetch();
  }
}

const vehicleTypeRepo = new VehicleTypeRepository();
export default vehicleTypeRepo;
