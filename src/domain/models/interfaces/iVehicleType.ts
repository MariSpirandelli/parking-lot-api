import { IBaseModel } from './iBaseModel';

export type VehicleTypeEnum = 'car' | 'motorcycle' | 'van';
export type VehicleTypeInput = Pick<IVehicleType, 'type'>;

export interface IVehicleType extends IBaseModel {
  type: VehicleTypeEnum;
}
