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
  },
})
@Injectable()
export class AirPollutionStateService {
  constructor(private airPollutionApiService: AirPollutionApiService) { }

  @Selector()
  static airComponents(state: AirPollutionState) {
    return state.airComponents;
  }

  @Action(GetAirPollutionData)
  getCurrentWeather(context: StateContext<AirPollutionState>, { longitude, latitude } : GetAirPollutionData) {
    return this.airPollutionApiService.getAirPollutionData(longitude as string, latitude as string)
      .pipe(
        tap(data => {
          context.patchState({ airComponents: data.list[0].components });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
