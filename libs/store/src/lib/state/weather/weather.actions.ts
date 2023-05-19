export class SetPlace {
    constructor(public place: string, public long: string, public lat: string) { }
    static readonly type = '[SetPlace] Set place to retrieve more details';
}

export class GetCurrentWeather {
    static readonly type = '[GetCurrentWeather] Get current weather for place';
}
