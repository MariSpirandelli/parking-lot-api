import {
  IVehicleType,
  VehicleTypeInput,
} from '../../../domain/models/interfaces/iVehicleType';

export interface IVehicleTypeRepository {
  persist: (slot: VehicleTypeInput) => Promise<IVehicleType>;
  update: (id: number, slot: VehicleTypeInput) => Promise<IVehicleType[]>;
  fetch: () => Promise<IVehicleType[]>;
  remove: (id: number) => Promise<IVehicleType[]>;
}
