import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { AirPollution, AirPollutionState } from '@weather-forecast/models';
import { AirPollutionApiService } from '@weather-forecast/apis';

import { GetAirPollutionData } from './air-pollution.actions';

@State<AirPollutionState>({
  name: 'AirPollution',
  defaults: {
    // airComponents: undefined,
    // airQuality: undefined,
    currentAirQuality: undefined
  },
})
@Injectable()
export class AirPollutionStateService {
  constructor(private airPollutionApiService: AirPollutionApiService) { }

  // @Selector()
  // static airComponents(state: AirPollutionState) {
  //   return state.airComponents;
  // }

  // @Selector()
  // static airQuality(state: AirPollutionState) {
  //   return state.airQuality;
  // }


  @Selector()
  static currentAirQuality(state: AirPollutionState) {
    return state.currentAirQuality;
  }

  @Action(GetAirPollutionData)
  getCurrentWeather(context: StateContext<AirPollutionState>, { longitude, latitude }: GetAirPollutionData) {
    return this.airPollutionApiService.getAirPollutionData(longitude as string, latitude as string)
      .pipe(
        tap(data => {
          const currentDateTime = new Date().toISOString().slice(0, -11);
          const currentTimeIndex = data.hourly.time.findIndex(t => t.includes(currentDateTime));

          const description = this.getAirQuality(data.hourly.us_aqi[currentTimeIndex]) as string;

          context.patchState({
            // airComponents: data.list[0].components,
            // airQuality: this.getAirQuality(data.list[0].main.aqi)
            currentAirQuality: new AirPollution(description, currentDateTime)
          });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  private getAirQuality(value: number): string | undefined {
    switch (true) {
      case value <= 50:
        return "good";
      case value >= 51 && value <= 100:
        return "moderate";
      case value >= 101 && value <= 150:
        return "unhealthy for sensitive groups";
      case value >= 151 && value <= 200:
        return "unhealthy";
      case value >= 201 && value <= 300:
        return "very unhealthy";
      case value >= 301:
        return "hazardous";
      default:
        return;
    }
  }
}
