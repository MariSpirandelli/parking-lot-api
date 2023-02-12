import BaseModel from './baseModel';
import { VehicleType } from './vehicleType';

export class Vehicle extends BaseModel {
  vehicleTypeId: number;
  plate: string;

  type: VehicleType;

  static get tableName() {
    return 'vehicles';
  }

  static get relationMappings() {
    return {
      type: {
        join: { from: 'vehicles.vehicle_type_id', to: 'vehicle_types.id' },
        modelClass: VehicleType,
        relation: BaseModel.HasOneRelation,
      },
    };
  }
}
