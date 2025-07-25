import express from 'express';
const router = express.Router();
import { getActiveNews, getArchiveNews, archiveNews, createNews, deleteNews } from '../controller/news';

router.get('/', getActiveNews);

router.get('/archive', getArchiveNews);

router.post('/', createNews);

router.put('/:id/archive', archiveNews);

router.delete('/:id', deleteNews);



export default router;