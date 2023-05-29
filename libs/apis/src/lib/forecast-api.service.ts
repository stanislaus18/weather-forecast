import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ForecastList } from '@weather-forecast/models';

import { URL } from './constants';

@Injectable({
    providedIn: 'root',
})
export class ForecastApiService {
    constructor(private httpClient: HttpClient) { }

    getHourlyForecast(latitude: string, longitude: string): Observable<{ hourly: ForecastList }> {
        return this.httpClient.get<{ hourly: ForecastList }>(`${URL}forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode`);
    }

    getComingDaysForecast(latitude: string, longitude: string): Observable<{ daily: ForecastList }> {
        return this.httpClient.get<{ daily: ForecastList }>(`${URL}forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=14&timezone=auto`)
    }
}