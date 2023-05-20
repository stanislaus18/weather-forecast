import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetForecast } from './forecast.actions';
import { ForecastState } from '@weather-forecast/models';
import { ForecastApiService } from '@weather-forecast/apis';

@State<ForecastState>({
  name: 'Forecast',
  defaults: {
    forecastList: [],
  },
})
@Injectable()
export class ForecastStateService {
  constructor(private forecastApiService: ForecastApiService) { }

  @Selector()
  static forecastList(state: ForecastState) {
    return state.forecastList;
  }

  @Action(GetForecast)
  getForecast(context: StateContext<ForecastState>, { longitude, latitude } : GetForecast) {
    return this.forecastApiService.getForecast(longitude as string, latitude as string)
      .pipe(
        tap(forecast => {
          const forecastList = forecast.list.map(fc => {
            return {
              dt_txt: fc.dt_txt,
              temp:String(fc.main.temp),
              descriptions: fc.weather[0].description
            }
          });
          context.patchState({ forecastList: forecastList});
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
