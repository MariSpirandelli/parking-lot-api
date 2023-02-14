import {
  VehicleInput,
  IVehicle,
  IVehicleFilter,
} from '../../domain/models/interfaces/iVehicle';

export interface IVehicleController {
  create: (vehicle: VehicleInput) => Promise<IVehicle>;
  update: (id: number, vehicle: VehicleInput) => Promise<IVehicle[]>;
  search: (filter?: IVehicleFilter) => Promise<IVehicle>;
}
