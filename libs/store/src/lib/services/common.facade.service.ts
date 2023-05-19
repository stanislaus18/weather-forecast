import { Injectable } from '@angular/core';

import { Select } from '@ngxs/store';
import { PlaceDetails } from '@weather-forecast/models';
import { Observable } from 'rxjs';

import { CommonStateService } from '../state';

@Injectable({
  providedIn: 'root',
})
export class CommonFacadeService {

  @Select(CommonStateService.getUsStateCapitals)
  usStateCapitals$!: Observable<PlaceDetails[]>;
}