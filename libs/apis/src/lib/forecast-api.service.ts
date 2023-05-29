import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Forecast } from '@weather-forecast/models';

import { URL } from './constants';

@Injectable({
    providedIn: 'root',
})
export class ForecastApiService {
    constructor(private httpClient: HttpClient) { }

    getForecast(lat: string, lon: string): Observable<Forecast> {
        return this.httpClient.get<Forecast>(`${URL}forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
    }
}