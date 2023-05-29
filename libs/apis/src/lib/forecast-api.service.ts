import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ForecastListHourly } from '@weather-forecast/models';

import { URL } from './constants';

@Injectable({
    providedIn: 'root',
})
export class ForecastApiService {
    constructor(private httpClient: HttpClient) { }

    getForecast(lat: string, lon: string): Observable<{ hourly: ForecastListHourly }> {
        return this.httpClient.get<{ hourly: ForecastListHourly }>(`${URL}forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`);
    }
}