import { IVehicle, VehicleInput } from 'src/domain/models/interfaces/iVehicle';

export interface IVehicleRepository {
  persist: (slot: VehicleInput) => Promise<IVehicle>;
  update: (id: number, slot: VehicleInput) => Promise<IVehicle[]>;
}