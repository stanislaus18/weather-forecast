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
    currentTemperature: undefined,
    weather: []
  },
})
@Injectable()
export class WeatherStateService {
  constructor(private weatherApiService: WeatherApiService) { }

  @Selector()
  static currentTemperature(state: WeatherState) {
    return state.currentTemperature;
  }

  @Selector()
  static weather(state: WeatherState) {
    return state.weather;
  }

  @Action(GetCurrentWeather)
  getCurrentWeather(context: StateContext<WeatherState>, { longitude, latitude }: GetCurrentWeather) {

    return this.weatherApiService.getCurrentWeather(longitude, latitude)
      .pipe(
        tap(data => {
          context.patchState({
            currentTemperature: Number(data.main.temp),
            weather: data.weather
          });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
