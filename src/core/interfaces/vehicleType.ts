import {
  VehicleTypeInput,
  IVehicleType,
} from '../../domain/models/interfaces/iVehicleType';

export interface IVehicleTypeController {
  create: (vehicle: VehicleTypeInput) => Promise<IVehicleType>;
  update: (id: number, vehicle: VehicleTypeInput) => Promise<IVehicleType[]>;
  search: () => Promise<IVehicleType[]>;
  getVehicleTypeByTypeId: (typeId: number) => Promise<IVehicleType>;
}
