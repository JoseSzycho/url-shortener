import { Iurl } from '../interfaces/url.interface';

export class UrlDto implements Iurl {
    url: string;
    constructor(url: Iurl) {
        this.url = url.url;
    }
}
