import BaseModel from './baseModel';
import { Slot } from './slot';
import { Vehicle } from './vehicle';

export class Parking extends BaseModel {
  slotId: number;
  vehicleId: number;
  checkinAt: string;
  checkoutAt: string;

  vehicle: Vehicle;
  slot: Slot;

  static get tableName() {
    return 'parkings';
  }

  static get relationMappings() {
    return {
      slot: {
        join: { from: 'parkings.slot_id', to: 'slots.id' },
        modelClass: Slot,
        relation: BaseModel.HasOneRelation,
      },
      vehicle: {
        join: { from: 'parkings.vehicle_id', to: 'vehicles.id' },
        modelClass: Vehicle,
        relation: BaseModel.HasOneRelation,
      },
    };
  }

  $beforeInsert() {
    super.$beforeInsert();
    this.checkinAt = new Date().toISOString();
  }

  $beforeUpdate() {
    super.$beforeUpdate();
    this.checkoutAt = new Date().toISOString();
  }
}
