import { Response, Request, Router } from 'express';
import slotController from '../core/slot';
import { BadRequestError } from '../infrastructure/express/errors';
import { asyncHandler } from '../infrastructure/express/middlewares/errorHandler';

const router = Router();

router.get(
  '/:parkingLotId',
  asyncHandler(async (req: Request, res: Response) => {
    const parkingLotId = parseInt(req.params.parkingLotId, 10);
    const filters = req.body;

    if (!parkingLotId) {
      throw new BadRequestError('Missing parking lot id');
    }

    return res.status(200).json(await slotController.search(filters));
  })
);

export = router;
