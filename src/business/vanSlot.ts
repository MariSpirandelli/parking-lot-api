import { OrderByDirection } from 'objection';
import { ISlot } from '../domain/models/interfaces/iSlot';
import { VehicleTypeEnum } from '../domain/models/interfaces/iVehicleType';
import { ISlotRepository } from '../domain/repositories/interfaces/iSlotRepository';
import { ParkingSlotRule } from './interfaces/iParkingSlot';
import { ParkingSlot } from './parkingSlot';

export class VanSlot extends ParkingSlot {
  constructor(
    slotRepository: ISlotRepository,
    vehicleType: VehicleTypeEnum = 'van'
  ) {
    super(slotRepository, vehicleType);
  }

  get searchOrder(): OrderByDirection {
    return 'desc';
  }

  getSlotsToPark(availableSlots: ISlot[], allowedSpots: string[]): ISlot[] {
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
      const sequentSpotNeeded = ParkingSlotRule[this.vehicleType][spot];

      let countSequenceSpots = 0;
      let lastSpotId = availableSlots[0].id;
      let slotsToPark = [];

      for (let availableSpot of availableSlots) {
        if (availableSpot.vehicleType.type !== spot) {
          continue;
        }

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
