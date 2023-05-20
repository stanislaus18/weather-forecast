import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, NgxsAfterBootstrap, Selector, State, StateContext } from '@ngxs/store';

import { CommonState } from '@weather-forecast/models';
import { AvailablePlaceService } from '@weather-forecast/apis';

import { GetUsStateCapitals, SetPlace } from './common.actions';

@State<CommonState>({
  name: 'Common',
  defaults: {
    place: undefined,
    latitude: undefined,
    longitude: undefined,
    getUsStateCapitals: []
  },
})
@Injectable()
export class CommonStateService implements NgxsAfterBootstrap {
  constructor(private availablePlaceService: AvailablePlaceService) { }

  // on boot of the application get the US State capitals
  ngxsAfterBootstrap(context: StateContext<CommonState>): void {
    context.dispatch(new GetUsStateCapitals());
  }

  @Selector()
  static getUsStateCapitals(state: CommonState) {
    return state.getUsStateCapitals;
  }

  @Selector()
  static getPlace(state: CommonState) {
    return state.place;
  }

  @Action(SetPlace)
  setPlace(context: StateContext<SetPlace>, action: SetPlace) {
    context.patchState({ place: action.place, latitude: action.latitude, longitude: action.longitude });
  }

  @Action(GetUsStateCapitals)
  getUsStateCapitals(context: StateContext<CommonState>) {

    return this.availablePlaceService.getUsStateCapitals()
      .pipe(
        tap(data => {
          context.patchState({ getUsStateCapitals: data });
        }),
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      );
  }
}
