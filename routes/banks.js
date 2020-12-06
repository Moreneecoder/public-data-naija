import express from 'express';
import { createBank, getBanks, getABank, getSelectBanks } from '../Controllers/banksController.js';

const router = express.Router();

//  all routes here automatically starts with route 'api/v1/banks'. So do not this to them
router.post('/', createBank);
router.get('/all', getBanks);
router.get('/single', getABank);
router.get('/collection', getSelectBanks);

export default router;