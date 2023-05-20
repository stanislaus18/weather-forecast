import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlaceDetails } from '@weather-forecast/models';

@Injectable({
    providedIn: 'root',
})
export class AvailablePlaceService {
    constructor(private httpClient: HttpClient) { }

    getUsStateCapitals(): Observable<PlaceDetails[]> {
        return this.httpClient.get<PlaceDetails[]>(`assets/us-state-capitals.json`);
    }
}