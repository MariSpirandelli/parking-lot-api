import {
  SlotInput,
  ISlot,
  ISlotFilter,
  SlotStatus,
} from '../../domain/models/interfaces/iSlot';

export interface ISlotController {
  create: (slot: SlotInput[]) => Promise<ISlot[]>;
  update: (id: number, slot: Partial<SlotInput>) => Promise<ISlot[]>;
  search: (filter?: ISlotFilter) => Promise<ISlot[]>;
  getAvailable: (vehicleTypeId: number, parkingLotId: number) => Promise<ISlot[]>;
  setAvailablility: (slotsIds: number[], status: SlotStatus) => Promise<ISlot[]>
}
