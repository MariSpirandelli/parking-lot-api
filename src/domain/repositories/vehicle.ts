import { VehicleInput, IVehicle, IVehicleFilter } from '../models/interfaces/iVehicle';
import { Vehicle } from '../models/vehicle';
import { IVehicleRepository } from './interfaces/iVehicleRepository';

class VehicleRepository implements IVehicleRepository {
  async persist(vehicle: VehicleInput): Promise<IVehicle> {
    return await Vehicle.query().insert(vehicle).returning('*');
  }

  async fetch(filter: IVehicleFilter): Promise<IVehicle> {
    const vehicleBuilder = Vehicle.query();
    if (filter.id) {
      vehicleBuilder.where('id', filter.id);
    }

    if (filter.plate) {
      vehicleBuilder.where('plate', filter.plate);
    }

    return await vehicleBuilder.withGraphFetched('type').select().first();
  }

  async update(id: number, vehicle: VehicleInput): Promise<IVehicle[]> {
    return await Vehicle.query().update(vehicle).where({ id }).returning('*');
  }
}

const vehicleRepo = new VehicleRepository();
export default vehicleRepo;
