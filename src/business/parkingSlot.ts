import { OrderByDirection } from 'objection';
import {
  IVehicleType,
  VehicleTypeEnum,
} from '../domain/models/interfaces/iVehicleType';
import { ISlotRepository } from '../domain/repositories/interfaces/iSlotRepository';
import { ISlot } from '../domain/models/interfaces/iSlot';
import { IParkingSlot, ParkingSlotRule } from './interfaces/iParkingSlot';

export abstract class ParkingSlot implements IParkingSlot {
  vehicleType: VehicleTypeEnum;
  slotRepository: ISlotRepository;

  constructor(slotRepository: ISlotRepository, vehicleType: VehicleTypeEnum) {
    this.vehicleType = vehicleType;
    this.slotRepository = slotRepository;
  }

  abstract getSlotsToPark(
    availableSlots: ISlot[],
    allowedSpots: string[]
  ): ISlot[];

  get searchOrder(): OrderByDirection {
    return 'asc';
  }

  async defineSlotToPark(vehicleTypes: IVehicleType[]): Promise<ISlot[]> {
    const allowedSpots = Object.keys(ParkingSlotRule[this.vehicleType]);
    const vehiclesTypesIds = vehicleTypes
      .filter((vehicleType) => allowedSpots.includes(vehicleType.type))
      .map((vehicleType) => vehicleType.id);

    const availableSlots = await this.slotRepository.fetch({
      inUse: false,
      vehiclesTypesIds,
      order: this.searchOrder,
    });

    if (!availableSlots?.length) {
      return null;
    }

    return this.getSlotsToPark(availableSlots, allowedSpots);
  }
}
