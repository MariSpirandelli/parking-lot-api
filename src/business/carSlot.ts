import { ISlot } from 'src/domain/models/interfaces/iSlot';
import { VehicleTypeEnum } from 'src/domain/models/interfaces/iVehicleType';
import { ISlotRepository } from 'src/domain/repositories/interfaces/iSlotRepository';
import { ParkingSlot } from './parkingSlot';

export class CarSlot extends ParkingSlot {
  constructor(
    slotRepository: ISlotRepository,
    vehicleType: VehicleTypeEnum = 'car'
  ) {
    super(slotRepository, vehicleType);
  }

  getSlotsToPark(availableSlots: ISlot[]): ISlot[] {
    /**
     * [business rule]: A motorcycle can park in any spot
     * since it returns ordered, get first available
     */
    return [availableSlots[0]];
  }
}
