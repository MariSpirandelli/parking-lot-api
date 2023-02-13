import express from 'express';

import parkingLotRouter from './parkingLot';
import parkingRouter from './parking';

const router = express.Router();

router.use('/parking-lot', parkingLotRouter);
router.use('/parking', parkingRouter);

export = router;
