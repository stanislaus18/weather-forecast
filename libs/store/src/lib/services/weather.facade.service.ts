import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';
import { WeatherElement } from '@weather-forecast/models';

import { GetCurrentWeather, WeatherStateService } from '../state';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {

  @Select(WeatherStateService.currentTemperature)
  currentTemperature$!: Observable<number>;

  @Select(WeatherStateService.weather)
  weather$!: Observable<WeatherElement[]>;

  @Dispatch() getCurrentWeather = (longitude: string, latitude: string) => new GetCurrentWeather(longitude, latitude);
}