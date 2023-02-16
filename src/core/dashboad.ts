import { IParkingRepository } from '../domain/repositories/interfaces/iParkingRepository';
import parkingRepo from '../domain/repositories/parking';
import { IDashboardSummary } from '../domain/models/interfaces/iDashboard';
import { IDashboardController } from './interfaces/dashboard';
import { IVehicleTypeController } from './interfaces/vehicleType';
import vehicleTypeController from './vehicleType';

class DashboardController implements IDashboardController {
  parkingRepo: IParkingRepository;

  vehicleTypeControl: IVehicleTypeController;

  constructor(parkingRepo: IParkingRepository, vehicleTypeControl: IVehicleTypeController) {
    this.parkingRepo = parkingRepo;
    this.vehicleTypeControl = vehicleTypeControl;
  }

  getSummary(parkingLotId: number): Promise<IDashboardSummary> {
    return this.parkingRepo.getSummary(parkingLotId);
  }
}

const dashboardController = new DashboardController(parkingRepo, vehicleTypeController);
export default dashboardController;
