import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { Select } from '@ngxs/store';
import { PlaceDetails } from '@weather-forecast/models';
import { Observable } from 'rxjs';

import { CommonStateService, SetPlace } from '../state';

@Injectable({
  providedIn: 'root',
})
export class CommonFacadeService {

  @Select(CommonStateService.getUsStateCapitals)
  usStateCapitals$!: Observable<PlaceDetails[]>;

  @Select(CommonStateService.getPlace)
  currentPlace$!: Observable<string>;

  @Dispatch() setPlace = (place: string, longitude: string, latitude: string) => new SetPlace(place, longitude, latitude);
}