import {
  ParkingLotInput,
  IParkingLot,
  IParkingLotSetup,
} from '../../domain/models/interfaces/iParkingLot';
import { ISlot } from '../../domain/models/interfaces/iSlot';

export interface IParkingLotController {
  create: (parking: ParkingLotInput) => Promise<IParkingLot>;
  update: (id: number, parking: ParkingLotInput) => Promise<IParkingLot[]>;
  search: (parkingLotId: number) => Promise<IParkingLot>;
  setup: (id: number, slotsSetup: IParkingLotSetup[]) => Promise<ISlot[]>;
}
