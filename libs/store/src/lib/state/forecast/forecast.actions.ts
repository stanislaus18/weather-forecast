export class GetForecast {
    constructor(public longitude: string, public latitude: string) { }
    static readonly type = '[GetForecast] Get current weather for place';
}
