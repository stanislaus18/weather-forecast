import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { ForecastApiService } from '@weather-forecast/apis';
import { ComingDaysForecast, Forecast, ForecastState, WMO } from '@weather-forecast/models';

import { GetHourlyForecast } from './forecast.actions';

@State<ForecastState>({
  name: 'Forecast',
  defaults: {
    comingDaysForecast: [],
    todaysForecast: []
  },
})
@Injectable()
export class ForecastStateService {
  constructor(private forecastApiService: ForecastApiService) { }

  @Selector()
  static comingDaysForecast(state: ForecastState) {
    return state.comingDaysForecast;
  }

  @Selector()
  static todaysForecast(state: ForecastState) {
    return state.todaysForecast;
  }

  @Action(GetHourlyForecast)
  getHourlyForecast(context: StateContext<ForecastState>, { longitude, latitude }: GetHourlyForecast) {
    return this.forecastApiService.getHourlyForecast(longitude as string, latitude as string)
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
            )
          });
          context.patchState({ todaysForecast });
        }),
        // call the daily api to get the coming days forecast
        switchMap(() => this.forecastApiService.getComingDaysForecast(longitude as string, latitude as string)),
        tap( data => {
          const temperatureMax = data.daily.temperature_2m_max;
          const temperatureMin = data.daily.temperature_2m_min;
          const comingDaysForecast = data.daily.time.map((date, index) => {
            return new ComingDaysForecast(
              temperatureMax[index],
              temperatureMin[index],
              date
            )
          })

          context.patchState({ comingDaysForecast });

        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
