import express from 'express';
import postController from '../controllers/postController.js';


const router = express.Router();

router.post('/create', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getSinglePost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;