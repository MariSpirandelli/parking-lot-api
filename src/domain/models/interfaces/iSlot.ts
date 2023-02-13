import { IBaseModel } from './iBaseModel';
import { IParkingLot } from './iParkingLot';
import { IVehicleType } from './iVehicleType';

export type SlotInput = Pick<ISlot, 'parkingLotId' | 'vehicleTypeId'>;

export interface ISlotFilter {
  id?: number;
  inUse?: boolean;
  vehicleTypeId?: number[];
}

export interface ISlot extends IBaseModel {
  parkingLotId: number;
  vehicleTypeId: number;

  parkingLot?: IParkingLot;
  type?: IVehicleType;
  leftSlot?: ISlot;
  rightSlot?: ISlot;
}
