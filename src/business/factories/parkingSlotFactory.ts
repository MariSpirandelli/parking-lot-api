import slotRepo from '../../domain/repositories/slot';
import { VehicleTypeEnum } from '../../domain/models/interfaces/iVehicleType';
import { ISlotRepository } from '../../domain/repositories/interfaces/iSlotRepository';
import { CarSlot } from '../carSlot';
import { MotorcycleSlot } from '../motorcycleSlot';
import { VanSlot } from '../vanSlot';

class ParkingSlotFactory {
  slotRepository: ISlotRepository;

  constructor(slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }

  getParkingSlotByVehicleType(vehicleType: VehicleTypeEnum, parkingLotId: number) {
    switch (vehicleType) {
      case 'motorcycle':
        return new MotorcycleSlot(this.slotRepository, parkingLotId);
      case 'car':
        return new CarSlot(this.slotRepository, parkingLotId);
      case 'van':
        return new VanSlot(this.slotRepository, parkingLotId);

      default:
        throw new Error('Vehicle not supported');
    }
  }
}

const parkingSlotFactory = new ParkingSlotFactory(slotRepo);
export default parkingSlotFactory;
