import { IVehicleFilter, VehicleInput } from '../domain/models/interfaces/iVehicle';
import { IVehicleRepository } from '../domain/repositories/interfaces/iVehicleRepository';
import vehicleRepo from '../domain/repositories/vehicle';
import { IVehicleController } from './interfaces/vehicle';

class VehicleController implements IVehicleController {
  vehicleRepo: IVehicleRepository;

  constructor(vehicleRepo: IVehicleRepository) {
    this.vehicleRepo = vehicleRepo;
  }

  async create(vehicleInput: VehicleInput) {
    const vehicle = await this.vehicleRepo.fetch({ plate: vehicleInput.plate });

    if (vehicle) {
      return vehicle;
    }

    return this.vehicleRepo.persist(vehicleInput);
  }

  search(filter?: IVehicleFilter) {
    return this.vehicleRepo.fetch(filter);
  }

  update(id: number, vehicle: VehicleInput) {
    return this.vehicleRepo.update(id, vehicle);
  }
}

const vehicleController = new VehicleController(vehicleRepo);
export default vehicleController;
