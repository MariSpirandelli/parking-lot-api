import BaseModel from './baseModel';
import { VehicleTypeEnum } from './interfaces/iVehicleType';

export class VehicleType extends BaseModel {
  type: VehicleTypeEnum;

  static get tableName() {
    return 'vehicle_types';
  }
}
