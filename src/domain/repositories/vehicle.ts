import { VehicleInput, IVehicle } from '../models/interfaces/iVehicle';
import { Vehicle } from '../models/vehicle';
import { IVehicleRepository } from './interfaces/iVehicleRepository';

class VehicleRepository implements IVehicleRepository {
  async persist(vehicle: VehicleInput): Promise<IVehicle> {
    return await Vehicle.query().insert(vehicle).returning('*');
  }

  async update(id: number, vehicle: VehicleInput): Promise<IVehicle[]> {
    return await Vehicle.query().update(vehicle).where({ id }).returning('*');
  }
}

const vehicleRepo = new VehicleRepository();
export default vehicleRepo;
