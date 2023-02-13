import {
  IVehicleType,
  VehicleTypeInput,
} from '../domain/models/interfaces/iVehicleType';
import { IVehicleTypeRepository } from '../domain/repositories/interfaces/iVehicleTypeRepository';
import vehicleTypeRepo from '../domain/repositories/vehicleType';
import { DateTime } from 'luxon';
import bunyan from 'bunyan';
import { IVehicleTypeController } from './interfaces/vehicleType';

const logger = bunyan.createLogger({ name: 'VehicleTypeController' });

class VehicleTypeController implements IVehicleTypeController {
  vehicleTypeRepo: IVehicleTypeRepository;

  vehicleTypesCache: IVehicleType[];
  cacheExpiration;

  constructor(vehicleTypeRepo: IVehicleTypeRepository) {
    this.vehicleTypeRepo = vehicleTypeRepo;
  }

  create(vehicleType: VehicleTypeInput) {
    return this.vehicleTypeRepo.persist(vehicleType);
  }

  search() {
    return this.vehicleTypeRepo.fetch();
  }

  update(id: number, vehicleType: VehicleTypeInput) {
    return this.vehicleTypeRepo.update(id, vehicleType);
  }

  getVehicleTypesFromCache(): IVehicleType[] {
    try {
      if (this.cacheExpiration) {
        const currentTime = DateTime.local();
        if (currentTime > this.cacheExpiration) {
          this.vehicleTypesCache = null;
        }
      }

      return this.vehicleTypesCache;
    } catch (err) {
      logger.error(
        `[getVehicleTypesFromCache] Problem getting vehicles types from cache `,
        err
      );

      return this.vehicleTypesCache;
    }
  }

  saveVehicleTypesToCache(vehicleTypes: IVehicleType[]) {
    try {
      const currentTime = DateTime.local();
      this.cacheExpiration = currentTime.plus({ days: 1 });
      this.vehicleTypesCache = vehicleTypes;
    } catch (err) {
      logger.error(
        `[saveVehicleTypesToCache] Problem saving vehicles types to cache `,
        err
      );
    }
  }

  async getVehicleTypeByTypeId(typeId: number) {
    let vehicleTypes: IVehicleType[] = this.getVehicleTypesFromCache();
    if (vehicleTypes) {
      return vehicleTypes.filter((item) => item.id === typeId)[0];
    }

    vehicleTypes = await this.search();
    if (!vehicleTypes) {
      return null;
    }

    this.saveVehicleTypesToCache(vehicleTypes);

    return vehicleTypes.filter((item) => item.id === typeId)[0];
  }
}

const vehicleTypeController = new VehicleTypeController(vehicleTypeRepo);
export default vehicleTypeController;
