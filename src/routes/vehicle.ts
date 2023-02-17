import { Response, Request, Router } from 'express';
import vehicleController from '../core/vehicle';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const plate = req.body.plate;
    const vehicleTypeId = parseInt(req.body.vehicleTypeId, 10);

    return res
      .status(200)
      .json(await vehicleController.create({ plate, vehicleTypeId }));
  })
);

router.put(
  '/:vehicleId',
  asyncHandler(async (req: Request, res: Response) => {
    const vehicleId = parseInt(req.params.vehicleId, 10);

    if (isNaN(vehicleId)) {
      throw new BadRequestError('Missing vehicle id');
    }

    const { plate, vehicleTypeId } = req.body;

    return res
      .status(200)
      .json(
        await vehicleController.update(vehicleId, { plate, vehicleTypeId })
      );
  })
);

export = router;
