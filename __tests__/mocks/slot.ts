import { ISlot } from "../../src/domain/models/interfaces/iSlot";
import { availableVehicles } from "./vehicleType";

export const availableSlots: ISlot[] = [
  {
    id: 1,
    vehicleTypeId: 1,
    parkingLotId: 1,
    createdAt: '2023-02-14',

    vehicleType: availableVehicles[0]
  },
  {
    id: 2,
    vehicleTypeId: 2,
    parkingLotId: 1,
    createdAt: '2023-02-14',

    vehicleType: availableVehicles[1]
  },
  {
    id: 3,
    vehicleTypeId: 2,
    parkingLotId: 1,
    createdAt: '2023-02-14',

    vehicleType: availableVehicles[1]
  },
  {
    id: 5,
    vehicleTypeId: 3,
    parkingLotId: 1,
    createdAt: '2023-02-14',

    vehicleType: availableVehicles[2]
  },
  {
    id: 6,
    vehicleTypeId: 3,
    parkingLotId: 1,
    createdAt: '2023-02-14',
    vehicleType: availableVehicles[2]
  },
];
