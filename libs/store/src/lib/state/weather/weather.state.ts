import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { WeatherState } from '@weather-forecast/models';
import { WeatherApiService } from '@weather-forecast/apis';

import { GetCurrentWeather, SetPlace } from './weather.actions';

@State<WeatherState>({
  name: 'Weather',
  defaults: {
    place: undefined,
    longitude: undefined,
    latitude: undefined,
    currentTemperature: undefined,
  },
})
@Injectable()
export class WeatherStateService {
  constructor(private weatherApiService: WeatherApiService) { }

  @Selector()
  static currentTemperature(state: WeatherState) {
    return state.currentTemperature;
  }

  @Action(SetPlace)
  setPlace(context: StateContext<WeatherState>, action: SetPlace) {
    context.patchState({ place: action.place, latitude: action.long, longitude: action.lat });
    context.dispatch(new GetCurrentWeather())
  }

  @Action(GetCurrentWeather)
  getCurrentWeather(context: StateContext<WeatherState>) {
    const { longitude, latitude } = context.getState();

    return this.weatherApiService.getCurrentWeather(longitude as string, latitude as string)
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
