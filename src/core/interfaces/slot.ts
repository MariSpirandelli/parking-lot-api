import {
  SlotInput,
  ISlot,
  ISlotFilter,
} from '../../domain/models/interfaces/iSlot';

export interface ISlotController {
  create: (slot: SlotInput[]) => Promise<ISlot[]>;
  update: (id: number, slot: SlotInput) => Promise<ISlot[]>;
  search: (filter?: ISlotFilter) => Promise<ISlot[]>;
  getAvailable: (vehicleTypeId: number) => Promise<ISlot[]>;
}
