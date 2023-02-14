import { ISlot } from 'src/domain/models/interfaces/iSlot';
import {
  IVehicleType,
  VehicleTypeEnum,
} from 'src/domain/models/interfaces/iVehicleType';
import { ISlotRepository } from 'src/domain/repositories/interfaces/iSlotRepository';
import { IParkingSlot, ParkingSlotRule } from './interfaces/iParkingSlot';

export class CarSlot implements IParkingSlot {
  vehicleType: VehicleTypeEnum;
  slotRepository: ISlotRepository;

  constructor(
    vehicleType: VehicleTypeEnum = 'car',
    slotRepository: ISlotRepository
  ) {
    this.vehicleType = vehicleType;
    this.slotRepository = slotRepository;
  }

  async defineSlotToPark(vehicleTypes: IVehicleType[]): Promise<ISlot[]> {
    const allowedSpots = Object.keys(ParkingSlotRule[this.vehicleType]);
    const vehiclesTypesIds = vehicleTypes
      .filter((vehicleType) => allowedSpots.includes(vehicleType.type))
      .map((vehicleType) => vehicleType.id);

    const availableSlots = await this.slotRepository.fetch({
      inUse: false,
      vehiclesTypesIds,
    });
    if (!availableSlots?.length) {
      return null;
    }

    /**
     * [business rule]: A car can park in both car or van spots
     * since it returns ordered, get first available
     */
    return [availableSlots[0]];
  }
}
