import express from 'express';

import parkingRouter from './parking';
import parkingLotRouter from './parkingLot';
import slotRouter from './slot';
import vehicleRouter from './vehicle';
import vehicleTypeRouter from './vehicleType';

const router = express.Router();

router.use('/parkings', parkingRouter);
router.use('/parking-lots', parkingLotRouter);
router.use('/slots', slotRouter);
router.use('/vehicles', vehicleRouter);
router.use('/vehicle-types', vehicleTypeRouter);

export = router;
