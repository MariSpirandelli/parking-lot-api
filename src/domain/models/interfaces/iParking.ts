import { IBaseModel } from './iBaseModel';
import { ISlot } from './iSlot';
import { IVehicle } from './iVehicle';

export type ParkingInput = Pick<IParking, 'slotId' | 'vehicleId'>;

export interface IParkingFilter {
  slotId?: number;
  vehicleId?: number;
  inUse?: boolean;
}

export interface IParking extends IBaseModel {
  slotId: number;
  vehicleId: number;
  checkinAt: string;
  checkoutAt?: string;

  vehicle: IVehicle;
  slot: ISlot;
}
