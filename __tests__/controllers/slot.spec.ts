import { CarSlot } from '../../src/business/carSlot';
import parkingSlotFactory from '../../src/business/factories/parkingSlotFactory';
import { VehicleTypeEnum } from '../../src/domain/models/interfaces/iVehicleType';
import slotController from '../../src/core/slot';
import vehicleTypeController from '../../src/core/vehicleType';
import { availableVehicles } from '../mocks/vehicleType';
import { availableSlots } from '../mocks/slot';

describe('Slot Controller', () => {
  describe('when getting available slots', () => {
    let searchVehicles;
    const carSlot = new CarSlot(null);

    beforeAll(() => {
      searchVehicles = jest.spyOn(vehicleTypeController, 'search');
      searchVehicles.mockResolvedValue(availableVehicles);
    });

    test('should get list of accepted vehicle types', () => {
      slotController.getAvailable(1);
      jest
        .spyOn(parkingSlotFactory, 'getParkingSlotByVehicleType')
        .mockImplementation((_: VehicleTypeEnum) => carSlot);

      jest
        .spyOn(carSlot, 'defineSlotToPark')
        .mockResolvedValue([availableSlots[1]]);

      expect(searchVehicles).toBeCalled();
    });
  });
});
