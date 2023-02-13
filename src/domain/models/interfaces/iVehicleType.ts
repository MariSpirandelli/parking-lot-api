import { IBaseModel } from './iBaseModel';

export type VehicleTypeEnum = 'car' | 'motorcycle' | 'van';
export type VehicleTypeInput = Pick<IVehicleType, 'type'>;

export const slotTypeOrder: SlotOrder = {
  motorcycle: 0,
  car: 1,
  van: 2,
};

export type SlotOrder = {
  [key in VehicleTypeEnum]: number;
};

export interface IVehicleType extends IBaseModel {
  type: VehicleTypeEnum;
}
