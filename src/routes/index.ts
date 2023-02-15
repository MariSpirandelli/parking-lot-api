import express from 'express';

import parkingRouter from './parking';
import parkingLotRouter from './parkingLot';
import slotRouter from './slot';
import vehicleRouter from './vehicle';

const router = express.Router();

router.use('/parkings', parkingRouter);
router.use('/parking-lots', parkingLotRouter);
router.use('/slots', slotRouter);
router.use('/vehicles', vehicleRouter);

export = router;
