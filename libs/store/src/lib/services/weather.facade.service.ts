import { Injectable } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { GetCurrentWeather, WeatherStateService } from '../state';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {

  @Select(WeatherStateService.currentTemperature)
  currentTemperature$!: Observable<number>;

  @Dispatch() getCurrentWeather = (longitude: string, latitude: string) => new GetCurrentWeather(longitude, latitude);
}