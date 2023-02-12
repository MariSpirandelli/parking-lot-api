import BaseModel from './baseModel';
import { ParkingLot } from './parkingLot';
import { VehicleType } from './vehicleType';

export class Slot extends BaseModel {
  parkingLotId: number;
  vehicleTypeId: number;
  leftSlotId: number;
  rightSlotId: number;

  parkingLot: ParkingLot;
  type: VehicleType;
  leftSlot?: Slot;
  rightSlot?: Slot;

  static get tableName() {
    return 'slots';
  }

  static get relationMappings() {
    return {
      type: {
        join: { from: 'slots.vehicle_type_id', to: 'vehicle_types.id' },
        modelClass: VehicleType,
        relation: BaseModel.HasOneRelation,
      },
      leftSlot: {
        join: { from: 'slots.left_slot_id', to: 'slots.id' },
        modelClass: Slot,
        relation: BaseModel.HasOneRelation,
      },
      rightSlot: {
        join: { from: 'slots.right_slot_id', to: 'slots.id' },
        modelClass: Slot,
        relation: BaseModel.HasOneRelation,
      },
    };
  }
}
