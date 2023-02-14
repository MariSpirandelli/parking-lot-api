import { ISlot } from 'src/domain/models/interfaces/iSlot';
import { VehicleTypeEnum } from 'src/domain/models/interfaces/iVehicleType';
import { ISlotRepository } from 'src/domain/repositories/interfaces/iSlotRepository';
import { IParkingSlot } from './interfaces/iParkingSlot';

export class MotorcycleSlot implements IParkingSlot {
  vehicleType: VehicleTypeEnum;
  slotRepository: ISlotRepository;

  constructor(
    vehicleType: VehicleTypeEnum = 'motorcycle',
    slotRepository: ISlotRepository
  ) {
    this.vehicleType = vehicleType;
    this.slotRepository = slotRepository;
  }

  async defineSlotToPark(): Promise<ISlot[]> {
    const availableSlots = await this.slotRepository.fetch({
      inUse: false,
    });
    if (!availableSlots?.length) {
      return null;
    }

    /**
     * [business rule]: A motorcycle can park in any spot
     * since it returns ordered, get first available
     */
    return [availableSlots[0]];
  }
}
