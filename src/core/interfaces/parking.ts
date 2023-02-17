import { ParkingInput, IParking, IParkingFilter, ParkingCheckin } from "../../domain/models/interfaces/iParking";

export interface IParkingController {
    create: (parking: ParkingInput) => Promise<IParking>;
    update: (id: number, parking: ParkingInput) => Promise<IParking[]>;
    search: (filter?: IParkingFilter) => Promise<IParking[]>;
    park: (parking: ParkingCheckin) => Promise<IParking[]>;
    remove: (vehicleId: number, parkingLotId: number) => Promise<IParking[]>;
  }