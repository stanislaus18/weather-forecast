import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetForecast } from './forecast.actions';
import { ForecastState } from '@weather-forecast/models';
import { ForecastApiService } from '@weather-forecast/apis';
import { DomSanitizer } from '@angular/platform-browser';

@State<ForecastState>({
  name: 'Forecast',
  defaults: {
    forecastList: [],
    todaysForecast: []
  },
})
@Injectable()
export class ForecastStateService {
  private baseUrl = 'http://openweathermap.org/img/w/';
  constructor(private forecastApiService: ForecastApiService, private sanitizer: DomSanitizer) { }

  @Selector()
  static forecastList(state: ForecastState) {
    return state.forecastList;
  }

  @Selector()
  static todaysForecast(state: ForecastState) {
    return state.todaysForecast;
  }

  @Action(GetForecast)
  getForecast(context: StateContext<ForecastState>, { longitude, latitude }: GetForecast) {
    return this.forecastApiService.getForecast(longitude as string, latitude as string)
      .pipe(
        tap(forecast => {
          // get todays forecast 
          const todaysDate = (new Date).toISOString().split('T')[0];
          const todaysForeCastList = forecast.list.filter(fc => fc.dt_txt.includes(todaysDate));
          const todaysForecast = todaysForeCastList.map(tfc => {
            const date = tfc.dt_txt.split(' ');
            const time = date[1].slice(0, -3)

            return {
              time, // extract time
              temp: String(tfc.main.temp),
              description: tfc.weather[0].description,
              image: this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${tfc.weather[0].icon}.png`)
            }
          });
          context.patchState({ todaysForecast });

          // get other than todays forecast 
          const list = forecast.list.filter(fc => !fc.dt_txt.includes(todaysDate));
          const forecastList = list.map(tfc => {
            const date = tfc.dt_txt.split(' ');
            const time = date[1].slice(0, -3)
            return {
              time, // extract time
              date: date[0], // extracte date
              temp: String(tfc.main.temp),
              description: tfc.weather[0].description,
              image: this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${tfc.weather[0].icon}.png`)
            }
          });
          context.patchState({ forecastList });

        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
