import { ParkingInput, IParking, IParkingFilter, ParkingCheckin } from "src/domain/models/interfaces/iParking";
import { ISlot } from "src/domain/models/interfaces/iSlot";

export interface IParkingController {
    create: (parking: ParkingInput) => Promise<IParking>;
    update: (id: number, parking: ParkingInput) => Promise<IParking[]>;
    search: (filter?: IParkingFilter) => Promise<IParking[]>;
    getAvailable: (vehicleTypeId: number) => Promise<ISlot[]>;
    park: (parking: ParkingCheckin) => Promise<ISlot[]>;
    remove: (id: number) => Promise<IParking[]>;
  }