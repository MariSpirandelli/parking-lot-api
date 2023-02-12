import BaseModel from './baseModel';
import { IVehicle } from './interfaces/iVehicle';
import { IVehicleType } from './interfaces/iVehicleType';
import { VehicleType } from './vehicleType';

export class Vehicle extends BaseModel implements IVehicle{
  vehicleTypeId: number;
  plate: string;

  type: IVehicleType;

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
