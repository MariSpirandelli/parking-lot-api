import BaseModel from './baseModel';

export type VehicleTypeEnum = 'car' | 'motorcycle' | 'van';

export class VehicleType extends BaseModel {
  type: VehicleTypeEnum;

  static get tableName() {
    return 'vehicle_types';
  }
}
