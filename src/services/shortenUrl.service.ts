import { InternalServerError } from '../httpErrors/InternalServerError.httpError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../db/prismaClient.db';
import randomstring from 'randomstring';
import 'dotenv/config';
import { NotFoundError } from '../httpErrors/NotFoundError.httpError';
import { CreatedUrlDto } from '../dtos/createdUrl.dto';
import { UrlDto } from '../dtos/urlDto.dto';

class ShortenUrlService {
    /**
     * Creates a shorter version of a given url
     * @param url The url object
     * @returns The shorter url in a dto object
     */
    async create(urlDto: UrlDto): Promise<CreatedUrlDto> {
        // initial id length
        let length = 4;
        // security max length, for avoiding infinite loop
        const MAX_LENGTH = 10;

        let isUrlIdCreated = false;
        let urlId: string;
        let data;

        // creates an valid urlId, it loops increasing url length
        // every time there is a urlId collision, in order to not
        // take many iterations if there is already many urlId created
        do {
            // security check for avoid infinite loop
            if (length >= MAX_LENGTH)
                throw new InternalServerError('Server can not create URL id');

            // creating random urlId
            urlId = randomstring.generate({
                length: length,
                charset: 'alphanumeric',
            });

            try {
                // try to add url to db
                data = await prisma.link.create({
                    data: {
                        urlId: urlId,
                        url: urlDto.url,
                    },
                });

                // url is created, exit condition
                isUrlIdCreated = true;
            } catch (error) {
                if (error instanceof PrismaClientKnownRequestError) {
                    // if there is a collision on db, increase urlId length
                    if (error.code === 'P2002') {
                        length++;
                    }
                } else {
                    // if a unknown error, throw it
                    throw error;
                }
            }
        } while (!isUrlIdCreated);

        if (!data)
            throw new InternalServerError(
                'Can not retrieve data from created resource'
            );

        return new CreatedUrlDto({
            ...data,
            redirectionUrl: `${process.env.APP_HOST}/api/v1/shortenurl/redirect/${data?.urlId}`,
        });
    }

    /**
     * Returns the complete stored URL from the url id
     * stored in the db
     * @param urlId the url id
     * @returns the stored url in a dto
     */
    async redirect(urlId: string): Promise<UrlDto> {
        // getting url data
        const urlData = await prisma.link.findUnique({
            where: {
                urlId: urlId,
            },
        });

        // error if url not stored
        if (!urlData) throw new NotFoundError('Url not found');

        // storing visito to the url for statistics
        await prisma.linkView.create({
            data: {
                isMovile: true,
                linkId: urlData.id,
            },
        });

        return new UrlDto({ url: urlData.url });
    }

    async stats(
        key: string,
        from: string,
        skip: number | undefined,
        take: number | undefined
    ) {
        const today = new Date().getTime();
        let pastTime = new Date('2023-02-10');

        switch (from) {
            case undefined:
                break;
            case 'lastDay':
                pastTime = new Date(today - 1 * (24 * 60 * 60 * 1000));
                break;
            case 'lastWeek':
                pastTime = new Date(today - 7 * (24 * 60 * 60 * 1000));
                break;
            case 'lastMonth':
                pastTime = new Date(today - 31 * (24 * 60 * 60 * 1000));
                break;
        }

        const data = await prisma.linkView.findMany({
            skip: skip,
            take: take,
            where: {
                viewDate: { gte: pastTime },
                linkId: key,
            },
        });

        return data;
    }
}

const shortenUrlService = new ShortenUrlService();
export default ShortenUrlService;
export { shortenUrlService };
