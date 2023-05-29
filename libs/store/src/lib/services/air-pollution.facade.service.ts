import { Injectable } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { AirPollution } from '@weather-forecast/models';
import { Observable } from 'rxjs';

import { AirPollutionStateService, GetAirPollutionData } from '../state';

@Injectable({
  providedIn: 'root',
})
export class AirPollutionFacadeService {

  // @Select(AirPollutionStateService.airComponents)
  // airComponents$!: Observable<number>;

  // @Select(AirPollutionStateService.airQuality)
  // airQuality$!: Observable<string>;


  @Select(AirPollutionStateService.currentAirQuality)
  currentAirQuality$!: Observable<AirPollution>;

  @Dispatch() getAirPollutionData = (longitude: string, latitude: string) => new GetAirPollutionData(longitude, latitude);
}