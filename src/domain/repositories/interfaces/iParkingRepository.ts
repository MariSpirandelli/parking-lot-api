import { IParking, IParkingFilter, ParkingInput } from "src/domain/models/interfaces/iParking";

export interface IParkingRepository {
  persist: (parking: ParkingInput) => Promise<IParking>;
  update: (id: number, parking: ParkingInput) => Promise<IParking[]>;
  fetch: (filter: IParkingFilter) => Promise<IParking[]>;
  remove: (id: number) => Promise<IParking[]>
}
