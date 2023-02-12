import BaseModel from './baseModel';
import { IParking } from './interfaces/iParking';
import { IParkingLot } from './interfaces/iParkingLot';
import { ISlot } from './interfaces/iSlot';
import { Parking } from './parking';
import { Slot } from './slot';

export class ParkingLot extends BaseModel implements IParkingLot {
  name: string;

  slots: ISlot[];
  parkings: IParking[];

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
