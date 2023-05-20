import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Weather } from '@weather-forecast/models';
import { URL, APP_ID, UNITS } from './constants';

@Injectable({
    providedIn: 'root',
})
export class WeatherApiService {
    constructor(private httpClient: HttpClient) { }

    getCurrentWeather(lat: string, lon: string): Observable<Weather> {
        return this.httpClient.get<Weather>(`${URL}weather?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=${UNITS}`);
    }
}