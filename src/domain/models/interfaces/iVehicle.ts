import { IBaseModel } from './iBaseModel';
import { IVehicleType } from './iVehicleType';

export type VehicleInput = Pick<IVehicle, 'plate' | 'vehicleTypeId'>;

export interface IVehicleFilter {
  id?: number;
  plate?: string;
}

export interface IVehicle extends IBaseModel {
  vehicleTypeId: number;
  plate: string;

  type: IVehicleType;
}
