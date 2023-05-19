import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { WeatherState } from '@weather-forecast/models';
import { WeatherApiService } from '@weather-forecast/apis';

import { GetCurrentWeather } from './weather.actions';

@State<WeatherState>({
  name: 'Weather',
  defaults: {
    currentTemperature: NaN
  },
})
@Injectable()
export class WeatherStateService {
  constructor(private weatherApiService: WeatherApiService) { }

  @Selector()
  static currentTemperature(state: WeatherState) {
    return state.currentTemperature;
  }

  @Action(GetCurrentWeather)
  setUserLanguage(context: StateContext<WeatherState>, action: GetCurrentWeather) {
    return this.weatherApiService.getCurrentWeather(52.5200, 13.4050)
      .pipe(
        tap(data => {
          context.patchState({ currentTemperature: Number(data.main.temp) });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
