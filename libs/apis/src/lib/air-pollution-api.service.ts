import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AirPollution } from '@weather-forecast/models';
import { AIR_QUALITY_URL } from './constants/air-quality-url.constant';

@Injectable({
    providedIn: 'root',
})
export class AirPollutionApiService {
    constructor(private httpClient: HttpClient) { }

    getAirPollutionData(latitude: string, longitude: string): Observable<AirPollution> {
        return this.httpClient.get<AirPollution>(`${AIR_QUALITY_URL}?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5,us_aqi`);
    }
}