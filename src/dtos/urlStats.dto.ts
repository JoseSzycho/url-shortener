import { IurlViews } from '../interfaces/urlViews.interface';
export class UrlStatsDto {
    totalViews: number;
    from: string;
    urlViews: IurlViews[];
    constructor(totalViews: number, from: string, urlViews: IurlViews[]) {
        this.totalViews = totalViews;
        this.from = from;
        this.urlViews = urlViews;
    }
}
