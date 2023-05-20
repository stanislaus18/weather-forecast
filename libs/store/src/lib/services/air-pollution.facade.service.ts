import { Injectable } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AirPollutionStateService, GetAirPollutionData } from '../state';

@Injectable({
  providedIn: 'root',
})
export class AirPollutionFacadeService {

  @Select(AirPollutionStateService.airComponents)
  airComponents$!: Observable<number>;

  @Dispatch() getAirPollutionData = (longitude: string, latitude: string) => new GetAirPollutionData(longitude, latitude);
}