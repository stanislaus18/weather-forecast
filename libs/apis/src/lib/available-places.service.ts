import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AvailablePlaceService {
    constructor(private httpClient: HttpClient) { }

    getUsStateCapitals(): Observable<any> {
        return this.httpClient.get<any>(`assets/us-state-capitals.json`);
    }
}