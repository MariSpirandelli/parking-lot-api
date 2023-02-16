import { IDashboardSummary } from "../../domain/models/interfaces/iDashboard";

export interface IDashboardController {
  getSummary: (parkingLotId: number) => Promise<IDashboardSummary>;
}
