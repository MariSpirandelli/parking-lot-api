import { IVehicleType } from 'src/domain/models/interfaces/iVehicleType';
import { ISlot } from '../domain/models/interfaces/iSlot';
import { IParkingSlot } from './interfaces/iParkingSlot';

export class ParkingSlot {
  parkingSlot: IParkingSlot;
  constructor(parkingSlot: IParkingSlot) {
    this.parkingSlot = parkingSlot;
  }

  async defineSlotToPark(vehicleTypes: IVehicleType[]): Promise<ISlot[]> {
    return this.parkingSlot.defineSlotToPark(vehicleTypes);
  }
}
