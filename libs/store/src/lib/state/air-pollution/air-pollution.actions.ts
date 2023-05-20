export class GetAirPollutionData {
    constructor(public longitude: string, public latitude: string) { }
    static readonly type = '[GetAirPollutionData] Get current weather for place';
}
