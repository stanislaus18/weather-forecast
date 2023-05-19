import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class ApiService {

    constructor(private httpClient: HttpClient,){}

    getWeather(): Observable<any>  {
        return this.httpClient.get('http://api.openweathermap.org/data/2.5/weather?lat=52.5200&lon=13.4050&appid=4ea498dfea3e22f1441c39c2db35141c&units=metric');
    }
  }