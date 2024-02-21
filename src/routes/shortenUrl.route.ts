import express, { Router } from 'express';
import { shortenUrlController } from '../controllers/shortenUrl.controller';
import { validateReqBody } from '../middlewares/reqBodyValidator.middleware';
import { urlSchema } from '../schemas/url.schema';

const router: Router = express.Router();

router.post('/create', validateReqBody(urlSchema), shortenUrlController.create);
router.get('/redirect/:urlId', shortenUrlController.redirect);
router.get('/stats/:key', shortenUrlController.stats);

export { router as shortenUrlRouter };
