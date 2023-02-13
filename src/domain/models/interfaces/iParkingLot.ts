import { IBaseModel } from './iBaseModel';
import { IParking } from './iParking';
import { ISlot } from './iSlot';

export type ParkingLotInput = Pick<IParkingLot, 'name'>;
export interface IParkingLotSetup {
  vehicleTypeId: number;
  quantity: number;
}

export interface IParkingLot extends IBaseModel {
  name: string;

  slots?: ISlot[];
  parkings: IParking[];
}
