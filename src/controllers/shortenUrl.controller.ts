import { shortenUrlService } from '../services/shortenUrl.service';
import ShortenUrlService from '../services/shortenUrl.service';
import { Request, Response, NextFunction } from 'express';
import { UrlDto } from '../dtos/urlDto.dto';
import { BadRequestError } from '../httpErrors/BadRequestError.httpError';
import { GetStatsOptionsDto } from '../dtos/getStatsOptions.dto';

class ShortenUrlController {
    private shortenUrlService: ShortenUrlService;
    constructor(shortenUrlService: ShortenUrlService) {
        this.shortenUrlService = shortenUrlService;
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const urlDto = new UrlDto(req.body);
        try {
            const shortenUrl = await this.shortenUrlService.create(urlDto);
            res.status(200).json(shortenUrl);
        } catch (error) {
            next(error);
        }
    };

    redirect = async (req: Request, res: Response, next: NextFunction) => {
        const urlId: string = req.params.urlId;
        try {
            const urlDto = await this.shortenUrlService.redirect(urlId);
            res.redirect(urlDto.url);
        } catch (error) {
            next(error);
        }
    };

    stats = async (req: Request, res: Response, next: NextFunction) => {
        const fromQueryParams = [
            undefined,
            'lastDay',
            'lastWeek',
            'lastMonth',
            'beginning',
        ];

        const from = req.query.from as string;

        const key: string = req.params.key;

        const validNumberQueryParam = (queryParam: unknown) => {
            if (queryParam)
                if (!isNaN(Number(queryParam))) {
                    return Number(queryParam);
                } else {
                    throw new BadRequestError('Invalid query parameter');
                }

            return undefined;
        };

        try {
            const skip = validNumberQueryParam(req.query.skip);
            const take = validNumberQueryParam(req.query.take);

            if (!fromQueryParams.includes(from))
                throw new BadRequestError('Invalid query parameter');

            const UrlStatsDto = await this.shortenUrlService.stats(
                new GetStatsOptionsDto(key, from, skip, take)
            );

            res.status(200).json(UrlStatsDto);
        } catch (error) {
            next(error);
        }
    };
}

const shortenUrlController = new ShortenUrlController(shortenUrlService);
export { shortenUrlController };
