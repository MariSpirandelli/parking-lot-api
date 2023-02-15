import {
  ISlot,
  ISlotFilter,
  SlotInput,
} from '../../../domain/models/interfaces/iSlot';

export interface ISlotRepository {
  persist: (slot: SlotInput[]) => Promise<ISlot[]>;
  update: (id: number, slot: Partial<SlotInput>) => Promise<ISlot[]>;
  updateMany: (ids: number[], properties: Partial<SlotInput>) => Promise<ISlot[]>;
  fetch: (filter: ISlotFilter) => Promise<ISlot[]>;
  remove: (id: number, parkingLotId: number) => Promise<ISlot[]>;
}
