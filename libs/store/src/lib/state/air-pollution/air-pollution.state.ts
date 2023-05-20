import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AirPollutionState } from '@weather-forecast/models';
import { AirPollutionApiService } from '@weather-forecast/apis';

import { GetAirPollutionData } from './air-pollution.actions';

@State<AirPollutionState>({
  name: 'AirPollution',
  defaults: {
    airComponents: undefined,
    airQuality: undefined
  },
})
@Injectable()
export class AirPollutionStateService {
  constructor(private airPollutionApiService: AirPollutionApiService) { }

  @Selector()
  static airComponents(state: AirPollutionState) {
    return state.airComponents;
  }

  @Selector()
  static airQuality(state: AirPollutionState) {
    return state.airQuality;
  }

  @Action(GetAirPollutionData)
  getCurrentWeather(context: StateContext<AirPollutionState>, { longitude, latitude }: GetAirPollutionData) {
    return this.airPollutionApiService.getAirPollutionData(longitude as string, latitude as string)
      .pipe(
        tap(data => {
          context.patchState({
            airComponents: data.list[0].components,
            airQuality: this.getAirQuality(data.list[0].main.aqi)
          });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  private getAirQuality(value: number): string | undefined {
    return {
      1: 'Good',
      2: 'Fair',
      3: 'Moderate',
      4: 'Poor',
      5: 'Very Poor'
    }[value];
  }
}
