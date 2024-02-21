import { ICreatedUrl } from '../interfaces/createdUrl.interface';

export class CreatedUrlDto {
    id: string;
    urlId: string;
    url: string;
    redirectionUrl: string;
    constructor(createdUrl: ICreatedUrl) {
        this.id = createdUrl.id;
        this.urlId = createdUrl.urlId;
        this.url = createdUrl.url;
        this.redirectionUrl = createdUrl.redirectionUrl;
    }
}
