import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';
import { GetCurrentWeather, WeatherStateService } from '../state';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {

  @Select(WeatherStateService.currentTemperature)
  currentTemperature$!: Observable<number>;

  @Select(WeatherStateService.description)
  description$!: Observable<string>;

  @Dispatch() getCurrentWeather = (longitude: string, latitude: string) => new GetCurrentWeather(longitude, latitude);
}