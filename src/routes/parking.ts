import { Response, Request, Router } from 'express';
import parkingController from '../core/parking';
import {
  BadRequestError,
} from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const slotId = parseInt(req.body.slotId, 10);
    const vehicleId = parseInt(req.body.vehicleId, 10);

    if (isNaN(slotId) || isNaN(vehicleId)) {
      throw new BadRequestError(
        'Slot id and vehicle id are mandatory and must be valid values'
      );
    }

    return res
      .status(200)
      .json(await parkingController.create({ slotId, vehicleId }));
  })
);

router.put(
  '/:parkingId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingId = parseInt(req.params.parkingId, 10);

    if (isNaN(parkingId)) {
      throw new BadRequestError('Missing parking lot id');
    }

    const { slotId, vehicleId } = req.body;

    return res
      .status(200)
      .json(await parkingController.update(parkingId, { slotId, vehicleId }));
  })
);

export = router;
