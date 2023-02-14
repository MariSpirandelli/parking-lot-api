import slotRepo from 'src/domain/repositories/slot';
import { VehicleTypeEnum } from '../../domain/models/interfaces/iVehicleType';
import { ISlotRepository } from '../../domain/repositories/interfaces/iSlotRepository';
import { CarSlot } from '../carSlot';
import { MotorcycleSlot } from '../motorcycleSlot';
import { ParkingSlot } from '../parkingSlot';
import { VanSlot } from '../vanSlot';

class ParkingSlotFactory {
  slotRepository: ISlotRepository;

  constructor(slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }

  getParkingSlotByVehicleType(vehicleType: VehicleTypeEnum) {
    switch (vehicleType) {
      case 'motorcycle':
        return new ParkingSlot(
          new MotorcycleSlot(vehicleType, this.slotRepository)
        );
      case 'car':
        return new ParkingSlot(new CarSlot(vehicleType, this.slotRepository));
      case 'van':
        return new ParkingSlot(new VanSlot(vehicleType, this.slotRepository));

      default:
        throw new Error('Vehicle not supported');
    }
  }
}

const parkingSlotFactory = new ParkingSlotFactory(slotRepo);
export default parkingSlotFactory;
