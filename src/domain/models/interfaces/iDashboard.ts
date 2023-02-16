import { VehicleTypeEnum } from './iVehicleType';

export interface IDashboardSummaryDetails {
  parked: number;
}

export type IDashboardSummary = { remaining: number } & {
  [key in VehicleTypeEnum]: IDashboardSummaryDetails;
};
