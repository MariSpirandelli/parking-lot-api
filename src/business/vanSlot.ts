import { ISlot } from '../domain/models/interfaces/iSlot';
import {
  IVehicleType,
  VehicleTypeEnum,
} from '../domain/models/interfaces/iVehicleType';
import { ISlotRepository } from '../domain/repositories/interfaces/iSlotRepository';
import { IParkingSlot, ParkingSlotRule } from './interfaces/iParkingSlot';

export class VanSlot implements IParkingSlot {
  vehicleType: VehicleTypeEnum;
  slotRepository: ISlotRepository;

  constructor(
    vehicleType: VehicleTypeEnum = 'van',
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
      order: 'desc',
    });
    if (!availableSlots?.length) {
      return null;
    }

    /**
     * [business rule]: A van can park in both car or van spots
     * it takes 3 car spots though
     * since it returns ordered, if first available spot is a van get the first available
     */
    if (availableSlots[0].vehicleType.type === this.vehicleType) {
      return [availableSlots[0]];
    }

    return this.getOtherSlotTypeAvailable(allowedSpots, availableSlots);
  }

  getOtherSlotTypeAvailable(allowedSpots: string[], availableSlots: ISlot[]) {
    for (let spot of allowedSpots) {
      const sequentSpotNeeded =
        ParkingSlotRule[this.vehicleType][allowedSpots[spot]];
      let countSequenceSpots = 0;
      let lastSpotId = availableSlots[0].id;
      let slotsToPark = [];

      for (let availableSpot of availableSlots) {
        if (availableSpot.id - lastSpotId <= 1) {
          countSequenceSpots++;
          slotsToPark.push(availableSpot);
        } else {
          countSequenceSpots = 0;
          slotsToPark = [];
        }

        lastSpotId = availableSpot.id;
        if (countSequenceSpots === sequentSpotNeeded) {
          return slotsToPark;
        }
      }
    }

    return null;
  }
}
