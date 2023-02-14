import { Response, Request, Router } from 'express';
import { IParkingLotSetup } from '../domain/models/interfaces/iParkingLot';
import parkingLotController from '../core/parkingLot';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;

    return res.status(200).json(await parkingLotController.create({ name }));
  })
);

router.put(
  '/:parkingLotId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);

    if (!parkingLotId) {
      throw new BadRequestError('Missing parking lot id');
    }

    const name = req.body.name;

    return res
      .status(200)
      .json(await parkingLotController.update(parkingLotId, { name }));
  })
);

router.put(
  '/:parkingLotId/setup',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);

    if (!parkingLotId) {
      throw new BadRequestError('Missing parking lot id');
    }

    const slots = req.body.slots as IParkingLotSetup[];

    return res
      .status(200)
      .json(await parkingLotController.setup(parkingLotId, slots));
  })
);

export = router;
