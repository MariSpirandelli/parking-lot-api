import { IVehicle, IVehicleFilter, VehicleInput } from '../../../domain/models/interfaces/iVehicle';

export interface IVehicleRepository {
  persist: (slot: VehicleInput) => Promise<IVehicle>;
  fetch: (filter: IVehicleFilter) => Promise<IVehicle>;
  update: (id: number, slot: VehicleInput) => Promise<IVehicle[]>;
}
