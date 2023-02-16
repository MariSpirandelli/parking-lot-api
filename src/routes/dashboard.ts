import { Response, Request, Router } from 'express';
import dashboardController from '../core/dashboad';
import vehicleController from '../core/vehicle';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.get(
  '/:parkingLotId/slots/status',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);

    if (isNaN(parkingLotId)) {
      throw new BadRequestError('Missing parking lot id');
    }

    return res.status(200).json(await dashboardController.getSummary(parkingLotId));
  }),
);

router.put(
  '/:vehicleId',
  asyncHandler(async (req: Request, res: Response) => {
    const vehicleId = parseInt(req.params.vehicleId, 10);

    if (isNaN(vehicleId)) {
      throw new BadRequestError('Missing vehicle id');
    }

    const { plate, vehicleTypeId } = req.body;

    return res.status(200).json(await vehicleController.update(vehicleId, { plate, vehicleTypeId }));
  }),
);

export = router;
