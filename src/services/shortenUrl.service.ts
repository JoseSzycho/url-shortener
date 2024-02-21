import { cryptoRandomStringAsync } from 'crypto-random-string';
import { Iurl } from '../interfaces/url.interface';
import { prisma } from '../db/prismaClient.db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalServerError } from '../httpErrors/InternalServerError.httpError';
import 'dotenv/config';

class ShortenUrlService {
    async create(url: Iurl): Promise<Iurl> {
        // initial id length
        let length = 4;
        // security max length, for avoiding infinite loop
        const MAX_LENGTH = 10;

        let isUrlIdCreated = false;
        let urlId: string;

        // creates an valid urlId, it loops increasing url length
        // every time there is a urlId collision, in order to not
        // take many iterations if there is already many urlId created
        do {
            // creating random urlId
            urlId = await cryptoRandomStringAsync({
                length: length,
                type: 'alphanumeric',
            });

            try {
                // try to add url to db
                await prisma.link.create({
                    data: {
                        id: urlId,
                        url: url.url,
                    },
                });

                // security check for avoid infinite loop
                if (length >= MAX_LENGTH)
                    throw new InternalServerError(
                        'Server can not create URL id'
                    );

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

        return { url: `${process.env.APP_HOST}/${urlId}` };
    }
}

const shortenUrlService = new ShortenUrlService();
export default ShortenUrlService;
export { shortenUrlService };
