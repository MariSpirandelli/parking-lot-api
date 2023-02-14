import {
  IParkingLot,
  ParkingLotInput,
} from '../../../domain/models/interfaces/iParkingLot';

export interface IParkingLotRepository {
  persist: (parkingLot: ParkingLotInput) => Promise<IParkingLot>;
  fetch: (id: number) => Promise<IParkingLot>;
  update: (id: number, parkingLot: ParkingLotInput) => Promise<IParkingLot[]>;
}
