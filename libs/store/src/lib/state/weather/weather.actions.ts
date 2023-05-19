export class GetCurrentWeather {
    constructor(public long: string, public lat: string) { }
    static readonly type = '[GetCurrentWeather] Get current weather for given lon lat';
}
