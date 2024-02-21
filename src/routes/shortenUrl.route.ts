import express, { Router } from 'express';
import { shortenUrlController } from '../controllers/shortenUrl.controller';
import { validateReqBody } from '../middlewares/reqBodyValidator.middleware';
import { urlSchema } from '../schemas/url.schema';

const router: Router = express.Router();

router.post('/create', validateReqBody(urlSchema), shortenUrlController.create);
router.get('/redirect/:urlId', shortenUrlController.redirect);

export { router as shortenUrlRouter };
