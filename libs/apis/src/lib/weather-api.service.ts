import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Weather } from '@weather-forecast/models';

@Injectable({
    providedIn: 'root',
})
export class WeatherApiService {
    private readonly url = 'http://api.openweathermap.org/data/2.5/weather';
    private readonly appid = '4ea498dfea3e22f1441c39c2db35141c';
    private readonly units = 'metric';

    constructor(private httpClient: HttpClient) { }

    getCurrentWeather(lat: number, lon: number): Observable<Weather> {
        return this.httpClient.get<Weather>(`${this.url}?lat=${lat}&lon=${lon}&appid=${this.appid}&units=${this.units}`);
    }
}