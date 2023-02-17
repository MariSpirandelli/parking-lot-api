import { Response, Request, Router } from 'express';
import parkingController from '../core/parking';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.get(
  '/:parkingLotId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);
    const {...filters} = req.query;

    if (!parkingLotId) {
      throw new BadRequestError('Missing parking lot id');
    }

    return res.status(200).json(await parkingController.search(filters));
  })
);

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
    const parkedSlot = await parkingController.park({ vehicleId, parkingLotId });
    return res
      .status(200)
      .json(parkedSlot);
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
