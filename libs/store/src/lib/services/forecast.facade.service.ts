import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';

import { ForecastStateList } from '@weather-forecast/models';

import { ForecastStateService, GetForecast } from '../state';

@Injectable({
  providedIn: 'root',
})
export class ForecastFacadeService {

  @Select(ForecastStateService.forecastList)
  forecastList$!: Observable<ForecastStateList[]>;

  @Select(ForecastStateService.todaysForecast)
  todaysForecast$!: Observable<ForecastStateList[]>;

  @Dispatch() getForecast = (longitude: string, latitude: string) => new GetForecast(longitude, latitude);
}