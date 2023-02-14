import { ISlot } from 'src/domain/models/interfaces/iSlot';
import {
  IVehicleType,
  VehicleTypeEnum,
} from 'src/domain/models/interfaces/iVehicleType';

export type Rule = {
  [key in VehicleTypeEnum]?: number;
};

export type ParkingRule = {
  [key in VehicleTypeEnum]: Rule;
};

export const ParkingSlotRule: ParkingRule = {
  motorcycle: { motorcycle: 1, car: 1, van: 1 },
  car: { car: 1, van: 1 },
  van: { van: 1, car: 3 },
};

export interface IParkingSlot {
  vehicleType: VehicleTypeEnum;
  defineSlotToPark: (vehicleTypes: IVehicleType[]) => Promise<ISlot[]>;
}