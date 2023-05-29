import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { WeatherState, WMO } from '@weather-forecast/models';
import { WeatherApiService } from '@weather-forecast/apis';

import { GetCurrentWeather } from './weather.actions';

@State<WeatherState>({
  name: 'Weather',
  defaults: {
    currentWeather: undefined,
    description: undefined
  },
})
@Injectable()
export class WeatherStateService {
  constructor(private weatherApiService: WeatherApiService) { }

  @Selector()
  static currentTemperature(state: WeatherState) {
    return state.currentWeather?.temperature;
  }

  @Selector()
  static description(state: WeatherState) {
    return state.description;
  }

  @Action(GetCurrentWeather)
  getCurrentWeather(context: StateContext<WeatherState>, { longitude, latitude }: GetCurrentWeather) {

    return this.weatherApiService.getCurrentWeather(longitude, latitude)
      .pipe(
        tap(data => {
          const weatherCode = data.current_weather.weathercode;
          context.patchState({
            currentWeather: data.current_weather,
            description: WMO[weatherCode]
          });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
