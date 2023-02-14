import {
  ISlot,
  ISlotFilter,
  SlotInput,
} from '../../../domain/models/interfaces/iSlot';

export interface ISlotRepository {
  persist: (slot: SlotInput[]) => Promise<ISlot[]>;
  update: (id: number, slot: SlotInput) => Promise<ISlot[]>;
  fetch: (filter: ISlotFilter) => Promise<ISlot[]>;
  remove: (id: number) => Promise<ISlot[]>;
}
