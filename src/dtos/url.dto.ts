import { Iurl } from '../interfaces/url.interface';

export class Url implements Iurl {
    url: string;
    constructor(url: Iurl) {
        this.url = url.url;
    }
}
