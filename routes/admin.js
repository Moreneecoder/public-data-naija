import express from 'express';
import { deleteBank, updateBank } from '../Controllers/banksController.js';

const router = express.Router();

router.get('/create', (req, res) => {
    
    res.sendFile('createUser.html', { root: 'C:/Users/HP/Documents/node_projects/public-data-naija/public'});
});

router.get('/delete/:id', deleteBank);
router.patch('/edit/:id', updateBank);

export default router;