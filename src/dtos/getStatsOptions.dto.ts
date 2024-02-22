export class GetStatsOptionsDto {
    key: string;
    from: string;
    skip: number | undefined;
    take: number | undefined;
    constructor(
        key: string,
        from: string,
        skip: number | undefined,
        take: number | undefined
    ) {
        this.key = key;
        this.from = from;
        this.skip = skip;
        this.take = take;
    }
}
