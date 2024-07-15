import express from 'express';
import usersController from '../controllers/usersController.js';

const router = express.Router();


router.post('/registration', usersController.register);
router.post('/login', usersController.login);
router.get('/list', usersController.getUsersList);
router.get('/:id', usersController.getUserProfile);
router.put('/:id', usersController.updateUserProfile);
router.delete('/:id', usersController.deleteUser);

export default router;