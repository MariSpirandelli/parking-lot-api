import { IBaseModel } from './iBaseModel';
import { ISlot } from './iSlot';
import { IVehicle } from './iVehicle';

export type ParkingInput = Pick<
  IParking,
  'slotId' | 'vehicleId' | 'checkoutAt'
>;
export type ParkingCheckin = {
  vehicleId: number;
  parkingLotId: number;
};
export type ParkingCheckout = Pick<IParking, 'checkoutAt'>;

export interface IParkingFilter {
  id?: number;
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
