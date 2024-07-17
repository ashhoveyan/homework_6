import express from 'express';
import postController from '../controllers/taskController.js';


const router = express.Router();

router.get('/', postController.getTasks);
router.post('/', postController.createTask);
router.get('/:id', postController.getSingleTask);
router.put('/:id', postController.updateTask);
router.delete('/:id', postController.deleteTask);

export default router;