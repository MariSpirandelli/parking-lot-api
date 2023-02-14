import { ParkingInput, IParking, IParkingFilter, ParkingCheckin } from "../../domain/models/interfaces/iParking";
import { ISlot } from "../../domain/models/interfaces/iSlot";

export interface IParkingController {
    create: (parking: ParkingInput) => Promise<IParking>;
    update: (id: number, parking: ParkingInput) => Promise<IParking[]>;
    search: (filter?: IParkingFilter) => Promise<IParking[]>;
    park: (parking: ParkingCheckin) => Promise<ISlot[]>;
    remove: (id: number) => Promise<IParking[]>;
  }