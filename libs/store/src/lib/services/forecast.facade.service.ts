import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Observable } from 'rxjs';

import { ComingDaysForecast, Forecast } from '@weather-forecast/models';

import { ForecastStateService, GetHourlyForecast } from '../state';

@Injectable({
  providedIn: 'root',
})
export class ForecastFacadeService {

  @Select(ForecastStateService.comingDaysForecast)
  comingDaysForecast$!: Observable<ComingDaysForecast[]>;

  @Select(ForecastStateService.todaysForecast)
  todaysForecast$!: Observable<Forecast[]>;

  @Dispatch() getForecast = (longitude: string, latitude: string) => new GetHourlyForecast(longitude, latitude);
}