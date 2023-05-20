import { Injectable } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ForecastStateService, GetForecast } from '../state';

@Injectable({
  providedIn: 'root',
})
export class ForecastFacadeService {

  @Select(ForecastStateService.forecastList)
  forecastList$!: Observable<number>;

  @Dispatch() getForecast = (longitude: string, latitude: string) => new GetForecast(longitude, latitude);
}