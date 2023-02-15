import { Response, Request, Router } from 'express';
import parkingController from '../core/parking';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.post(
  '/:parkingLotId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);

    if (isNaN(parkingLotId)) {
      throw new BadRequestError('Missing parking lot id');
    }

    const vehicleId = parseInt(req.body.vehicleId, 10);

    if (isNaN(vehicleId)) {
      throw new BadRequestError(
        'Vehicle id are mandatory and must be valid value'
      );
    }

    return res
      .status(200)
      .json(await parkingController.park({ vehicleId, parkingLotId }));
  })
);

router.put(
  '/:parkingLotId/remove/:vehicleId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);

    if (isNaN(parkingLotId)) {
      throw new BadRequestError('Missing parking lot id');
    }

    const vehicleId = parseInt(req.params.vehicleId, 10);

    if (isNaN(vehicleId)) {
      throw new BadRequestError('Missing parking lot id');
    }

    return res
      .status(200)
      .json(await parkingController.remove(vehicleId, parkingLotId));
  })
);

export = router;
