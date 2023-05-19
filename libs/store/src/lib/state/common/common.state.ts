import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Action, NgxsAfterBootstrap, Selector, State, StateContext } from '@ngxs/store';

import { CommonState } from '@weather-forecast/models';
import { AvailablePlaceService } from '@weather-forecast/apis';

import { GetUsStateCapitals } from './common.actions';

@State<CommonState>({
  name: 'Common',
  defaults: {
    getUsStateCapitals: []
  },
})
@Injectable()
export class CommonStateService implements NgxsAfterBootstrap {
  constructor(private availablePlaceService: AvailablePlaceService) { }

  ngxsAfterBootstrap(context: StateContext<CommonState>): void {
      context.dispatch(new GetUsStateCapitals());
  }

  @Selector()
  static getUsStateCapitals(state: CommonState) {
    return state.getUsStateCapitals;
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
