import { IurlStats } from '../interfaces/urlStats.interface';
export class UrlStatsDto {
    id: string;
    viewDate: Date;
    isMovile: boolean;
    linkId: string;
    constructor(urlStats: IurlStats) {
        this.id = urlStats.id;
        this.viewDate = urlStats.viewDate;
        this.isMovile = urlStats.isMovile;
        this.linkId = urlStats.linkId;
    }
}
