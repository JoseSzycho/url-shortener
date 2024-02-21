import { InternalServerError } from '../httpErrors/InternalServerError.httpError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Iurl } from '../interfaces/url.interface';
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
     * @returns The shorter url
     */
    async create(url: Iurl): Promise<CreatedUrlDto> {
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
                        url: url.url,
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

        return new CreatedUrlDto(
            `${process.env.APP_HOST}/api/v1/shortenurl/redirect/${urlId}`,
            `${data?.urlId}`,
            `${data?.id}`
        );
    }

    async redirect(urlId: string): Promise<UrlDto> {
        const urlData = await prisma.link.findUnique({
            where: {
                urlId: urlId,
            },
        });

        if (!urlData) throw new NotFoundError('Url not found');

        await prisma.linkView.create({
            data: {
                isMovile: true,
                linkId: urlData.id,
            },
        });

        return new UrlDto({ url: urlData.url });
    }
}

const shortenUrlService = new ShortenUrlService();
export default ShortenUrlService;
export { shortenUrlService };
