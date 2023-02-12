import { IBaseModel } from './iBaseModel';
import { IParkingLot } from './iParkingLot';
import { IVehicleType } from './iVehicleType';

export type SlotInput = Pick<
  ISlot,
  'parkingLotId' | 'vehicleTypeId' | 'leftSlotId' | 'rightSlotId'
>;

export interface ISlotFilter {
  inUse?: boolean;
  vehicleTypeId?: number;
}

export interface ISlot extends IBaseModel {
  parkingLotId: number;
  vehicleTypeId: number;
  leftSlotId: number;
  rightSlotId: number;

  parkingLot: IParkingLot;
  type: IVehicleType;
  leftSlot?: ISlot;
  rightSlot?: ISlot;
}
