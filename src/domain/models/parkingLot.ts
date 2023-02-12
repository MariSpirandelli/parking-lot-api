import BaseModel from './baseModel';
import { Parking } from './parking';
import { Slot } from './slot';

export class ParkingLot extends BaseModel {
  slots: Slot[];
  parkings: Parking[];

  static get tableName() {
    return 'parking_lots';
  }

  static get relationMappings() {
    return {
      slots: {
        join: { from: 'parking_lot.id', to: 'slots.parking_lot_id' },
        modelClass: Slot,
        relation: BaseModel.HasManyRelation,
      },
      parkings: {
        join: {
          from: 'parking_lot.id',
          through: {
            from: 'slots.parking_lot_id',
            to: 'slots.id',
          },
          to: 'parkings.slot_id',
        },
        modelClass: Parking,
        relation: BaseModel.ManyToManyRelation,
      },
    };
  }
}
