import { availableSlots } from '../mocks/slot';
import { MotorcycleSlot } from '../../src/business/motorcycleSlot';
import { CarSlot } from '../../src/business/carSlot';
import { VanSlot } from '../../src/business/vanSlot';
import { availableVehicles } from '../mocks/vehicleType';

describe('Parking lot business rule', () => {
  describe('when getting available slots for motocycle', () => {
    const motorcycleSlot = new MotorcycleSlot(null);

    test('should get the first item from available slots even if it is a van slot type', () => {
      const newAvailableSlots = availableSlots.filter(
        (item) => item.vehicleTypeId === 3
      );

      const slotToPark = motorcycleSlot.getSlotsToPark(newAvailableSlots);

      expect(slotToPark.length).toBe(1);
      expect(slotToPark[0]?.id).toBe(5);
    });
  });
  describe('when getting available slots for car', () => {
    const carSlot = new CarSlot(null);

    test('should get the first item from available slots even if it is a van slot type', () => {
      const newAvailableSlots = availableSlots.filter(
        (item) => item.vehicleTypeId === 3
      );

      const slotToPark = carSlot.getSlotsToPark(newAvailableSlots);

      expect(slotToPark.length).toBe(1);
      expect(slotToPark[0]?.id).toBe(5);
    });
  });

  describe('when getting available slots for van', () => {
    const vanSlot = new VanSlot(null);

    test('should order query as desc', () => {
      const order = vanSlot.searchOrder;

      expect(order).toBe('desc');
    });

    test('should return null if not finding any van slot nor 3 consecutives car slot type available', () => {
      let newAvailableSlots = availableSlots;

      newAvailableSlots.reverse();

      newAvailableSlots = availableSlots.filter(
        (item) => item.vehicleTypeId === 2
      );

      const slotToPark = vanSlot.getSlotsToPark(newAvailableSlots, [
        'car',
        'van',
      ]);

      expect(slotToPark).toBe(null);
    });
    test('should return null if not finding any van slot nor 3 consecutives car slot type available', () => {
      let newAvailableSlots = availableSlots;

      newAvailableSlots.reverse();

      newAvailableSlots = availableSlots.filter(
        (item) => item.vehicleTypeId === 2
      );

      newAvailableSlots.unshift({
        id: 4,
        vehicleTypeId: 2,
        parkingLotId: 1,
        createdAt: '2023-02-14',

        vehicleType: availableVehicles[1],
      });

      const slotToPark = vanSlot.getSlotsToPark(newAvailableSlots, [
        'car',
        'van',
      ]);

      expect(slotToPark?.length).toBe(3);
      expect(slotToPark[0]?.id).toBe(4);
    });
  });
});
