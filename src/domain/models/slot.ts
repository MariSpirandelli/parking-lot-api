import BaseModel from './baseModel';
import { IParking } from './interfaces/iParking';
import { IParkingLot } from './interfaces/iParkingLot';
import { ISlot, SlotStatus } from './interfaces/iSlot';
import { IVehicleType } from './interfaces/iVehicleType';
import { Parking } from './parking';
import { VehicleType } from './vehicleType';

export class Slot extends BaseModel implements ISlot {
  parkingLotId: number;
  vehicleTypeId: number;
  status: SlotStatus;

  parkingLot?: IParkingLot;
  parking?: IParking;
  vehicleType?: IVehicleType;

  static get tableName() {
    return 'slots';
  }

  static get relationMappings() {
    return {
      vehicleType: {
        join: { from: 'slots.vehicle_type_id', to: 'vehicle_types.id' },
        modelClass: VehicleType,
        relation: BaseModel.HasOneRelation,
      },
      parking: {
        join: { from: 'parkings.slot_id', to: 'slots.id' },
        modelClass: Parking,
        relation: BaseModel.HasManyRelation,
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
