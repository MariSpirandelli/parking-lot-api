import { Response, Request, Router } from 'express';
import vehicleTypeController from '../core/vehicleType';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.get(
  '/',
  asyncHandler(async (_: Request, res: Response) => {
    return res
      .status(200)
      .json(await vehicleTypeController.search());
  })
);

export = router;
