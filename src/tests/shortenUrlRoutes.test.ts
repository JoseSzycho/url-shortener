import request from 'supertest';
import { app } from '../app';
import { UrlDto } from '../dtos/urlDto.dto';
import { CreatedUrlDto } from '../dtos/createdUrl.dto';
import { UrlStatsDto } from '../dtos/urlStats.dto';

const req = request(app);
const baseUrl = '/api/v1/shortenurl';
let createdUrlDto: CreatedUrlDto;

describe('Testing route /api/v1/shortenurl/create', () => {
    const urlDto: UrlDto = { url: 'http://google.com' };

    it('Should create the short url', async () => {
        const resp = await req
            .post(`${baseUrl}/create`)
            .send(urlDto)
            .expect(201);
        createdUrlDto = resp.body;
    });

    it('Should contain all properties', () => {
        expect(createdUrlDto).toHaveProperty('id');
        expect(createdUrlDto).toHaveProperty('urlId');
        expect(createdUrlDto).toHaveProperty('url');
        expect(createdUrlDto).toHaveProperty('redirectionUrl');
    });

    it('Should not create the short url if dto is wrong', async () => {
        await req
            .post(`${baseUrl}/create`)
            .send({ wrongProp: 'http://google.com' })
            .expect(400);
    });

    it('Should not create the short url is not a url', async () => {
        const wrongUrl: UrlDto = { url: 'google.com' };
        await req.post(`${baseUrl}/create`).send(wrongUrl).expect(400);
    });
});

describe('Testing route /api/v1/shortenurl/redirect', () => {
    it('Should redirect to original url', async () => {
        await req.get(`${baseUrl}/redirect/${createdUrlDto.urlId}`).expect(302);
    });

    it('Should give status 404 if invalid url id', async () => {
        const invalidUrlId = 'invalidId';
        await req.get(`${baseUrl}/redirect/${invalidUrlId}`).expect(404);
    });
});

describe('Testing route /api/v1/shortenurl/stats', () => {
    let urlStatsDto: UrlStatsDto;

    it('Should get the stats', async () => {
        const resp = await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .expect(200);
        urlStatsDto = resp.body;
    });

    it('Should contain properties', () => {
        expect(urlStatsDto).toHaveProperty('totalViews');
        expect(urlStatsDto).toHaveProperty('from');
        expect(urlStatsDto).toHaveProperty('urlViews');
        expect(urlStatsDto.urlViews[0]).toHaveProperty('id');
        expect(urlStatsDto.urlViews[0]).toHaveProperty('viewDate');
        expect(urlStatsDto.urlViews[0]).toHaveProperty('isMovile');
        expect(urlStatsDto.urlViews[0]).toHaveProperty('linkId');
    });

    it('Should increment views when redirection happens', async () => {
        expect(
            (await req.get(`${baseUrl}/stats/${createdUrlDto.id}`)).body
                .totalViews
        ).toEqual(1);

        // Performing redirection
        await req.get(`${baseUrl}/redirect/${createdUrlDto.urlId}`);

        expect(
            (await req.get(`${baseUrl}/stats/${createdUrlDto.id}`)).body
                .totalViews
        ).toEqual(2);
    });

    it('Should return results with different query params', async () => {
        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ from: 'lastDay', skip: 0 })
            .expect(200);

        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ from: 'lastWeek', take: 5 })
            .expect(200);

        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ from: 'lastMonth' })
            .expect(200);

        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ from: 'beginning' })
            .expect(200);
    });

    it('Should throw status 404 if invalid id', async () => {
        const invalidId = 'invalidId';
        await req.get(`${baseUrl}/stats/${invalidId}`).expect(404);
    });

    it('Should throw status 401 if wrong query parameters', async () => {
        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ from: 'invalid' })
            .expect(400);

        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ skip: 'invalid' })
            .expect(400);

        await req
            .get(`${baseUrl}/stats/${createdUrlDto.id}`)
            .query({ take: 'invalid' })
            .expect(400);
    });
});
