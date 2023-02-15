import express from 'express';

import parkingRouter from './parking';
import parkingLotRouter from './parkingLot';
import slotRouter from './slot';

const router = express.Router();

router.use('/parkings', parkingRouter);
router.use('/parking-lots', parkingLotRouter);
router.use('/slots', slotRouter);

export = router;
