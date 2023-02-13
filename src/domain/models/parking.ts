import BaseModel from './baseModel';
import { IParking } from './interfaces/iParking';
import { ISlot } from './interfaces/iSlot';
import { IVehicle } from './interfaces/iVehicle';
import { Slot } from './slot';
import { Vehicle } from './vehicle';

export class Parking extends BaseModel implements IParking {
  slotId: number;
  vehicleId: number;
  checkinAt: string;
  checkoutAt: string;

  vehicle: IVehicle;
  slot: ISlot;

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
}
