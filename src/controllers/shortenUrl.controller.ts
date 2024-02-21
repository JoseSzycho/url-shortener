import { shortenUrlService } from '../services/shortenUrl.service';
import ShortenUrlService from '../services/shortenUrl.service';
import { Request, Response, NextFunction } from 'express';

import { Iurl } from '../interfaces/url.interface';

class ShortenUrlController {
    private shortenUrlService: ShortenUrlService;
    constructor(shortenUrlService: ShortenUrlService) {
        this.shortenUrlService = shortenUrlService;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const url: Iurl = req.body;
        try {
            const shortenUrl = await this.shortenUrlService.create(url);
            res.status(200).json(shortenUrl);
        } catch (error) {
            next(error);
        }
    };

    redirect = async (req: Request, res: Response, next: NextFunction) => {
        const urlId: string = req.params.urlId;
        try {
            const url = await this.shortenUrlService.redirect(urlId);
            res.redirect(url.url);
        } catch (error) {
            next(error);
        }
    };
}

const shortenUrlController = new ShortenUrlController(shortenUrlService);
export { shortenUrlController };
