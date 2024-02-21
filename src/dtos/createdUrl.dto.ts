export class CreatedUrlDto {
    url: string;
    urlId: string;
    statisticsSecretKey: string;
    constructor(url: string, urlId: string, statisticsSecretKey: string) {
        this.url = url;
        this.urlId = urlId;
        this.statisticsSecretKey = statisticsSecretKey;
    }
}
