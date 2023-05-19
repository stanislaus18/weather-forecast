import { Injectable } from '@angular/core';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SetPlace, WeatherStateService } from '../state';

@Injectable({
  providedIn: 'root',
})
export class WeatherFacadeService {

  @Select(WeatherStateService.currentTemperature)
  currentTemperature$!: Observable<number>;

  @Dispatch() setPlace = (name: string, lon: string, lat: string) => new SetPlace(name, lon, lat);
}