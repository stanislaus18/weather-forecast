import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { GetForecast } from './forecast.actions';
import { Forecast, ForecastState, WMO } from '@weather-forecast/models';
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
        tap(data => {
          const weathercodeList = data.hourly.weathercode;
          const timeList = data.hourly.time;
          const forecast = data.hourly.temperature_2m.map((temp, index) => {
            return {
              temperature: temp,
              description: WMO[weathercodeList[index]],
              time: timeList[index]
            }
          });


          // get todays forecast 
          const todaysDate = (new Date).toISOString().split('T')[0];
          const todaysForeCastList = forecast.filter(fc => fc.time.includes(todaysDate));
          const todaysForecast = todaysForeCastList.map(tfc => {
            const date = tfc.time.split('T');
            const time = date[1];

            return new Forecast(
              tfc.temperature,
              tfc.description,
              time,
              // image: this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${tfc.weather[0].icon}.png`)
            )
          });
          context.patchState({ todaysForecast });

          // get other than todays forecast 
          const list = forecast.filter(fc => !fc.time.includes(todaysDate));
          const forecastList = list.map(tfc => {
            const time = tfc.time.replace('T',' ');
            // const time = date[1];
            return new Forecast(
              tfc.temperature,
              tfc.description,
              time,
              // image: this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${tfc.weather[0].icon}.png`)
            ) 
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
