import { IParking, IParkingFilter, ParkingCheckout, ParkingInput } from "src/domain/models/interfaces/iParking";

export interface IParkingRepository {
  persist: (parking: ParkingInput) => Promise<IParking>;
  update: (id: number, parking: ParkingInput | ParkingCheckout) => Promise<IParking[]>;
  fetch: (filter?: IParkingFilter) => Promise<IParking[]>;
  remove: (id: number) => Promise<IParking[]>
  saveAll: (parking: ParkingInput[]) => Promise<IParking[]>;
}
