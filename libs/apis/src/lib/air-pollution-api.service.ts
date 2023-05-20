import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { URL, APP_ID, UNITS } from './constants';
import { AirPollution } from '@weather-forecast/models';

@Injectable({
    providedIn: 'root',
})
export class AirPollutionApiService {
    constructor(private httpClient: HttpClient) { }

    getAirPollutionData(lat: string, lon: string): Observable<AirPollution> {
        return this.httpClient.get<AirPollution>(`${URL}air_pollution?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${UNITS}`);
    }
}