import { OrderByDirection } from 'objection';
import { IBaseModel } from './iBaseModel';
import { IParkingLot } from './iParkingLot';
import { IVehicleType } from './iVehicleType';

export type SlotInput = Pick<ISlot, 'parkingLotId' | 'vehicleTypeId'>;

export interface ISlotFilter {
  id?: number;
  inUse?: boolean;
  vehiclesTypesIds?: number[];
  parkingLotId?: number;
  order?: OrderByDirection;
}

export interface ISlot extends IBaseModel {
  parkingLotId: number;
  vehicleTypeId: number;

  parkingLot?: IParkingLot;
  vehicleType?: IVehicleType;
  leftSlot?: ISlot;
  rightSlot?: ISlot;
}
