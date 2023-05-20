import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Forecast } from '@weather-forecast/models';
import { APP_ID, UNITS, URL } from './constants';

@Injectable({
    providedIn: 'root',
})
export class ForecastApiService {
    constructor(private httpClient: HttpClient) { }

    getForecast(lat: string, lon: string): Observable<Forecast> {
        return this.httpClient.get<Forecast>(`${URL}forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${UNITS}`);
    }
}