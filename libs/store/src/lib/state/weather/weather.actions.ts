export class GetCurrentWeather {
    constructor(public longitude: string, public latitude: string) { }
    static readonly type = '[GetCurrentWeather] Get current weather for place';
}
