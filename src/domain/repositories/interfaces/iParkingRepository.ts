import { IDashboardSummary } from "../../../domain/models/interfaces/iDashboard";
import { IParking, IParkingFilter, ParkingCheckout, ParkingInput } from "../../../domain/models/interfaces/iParking";

export interface IParkingRepository {
  persist: (parking: ParkingInput) => Promise<IParking>;
  update: (id: number, parking: ParkingInput | ParkingCheckout) => Promise<IParking[]>;
  fetch: (filter?: IParkingFilter) => Promise<IParking[]>;
  remove: (vehicleId: number, parkingLotId: number) => Promise<IParking[]>
  saveAll: (parking: ParkingInput[]) => Promise<IParking[]>;
  getSummary: (parkingLotId: number) => Promise<IDashboardSummary>
}
