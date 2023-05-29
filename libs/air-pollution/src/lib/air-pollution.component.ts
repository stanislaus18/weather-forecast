import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AirPollution } from '@weather-forecast/models';
import { AirPollutionFacadeService } from '@weather-forecast/store';

@Component({
  selector: 'air-pollution-component',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss'],
})
export class AirPollutionComponent implements OnInit {
  currentAirQuality$: Observable<AirPollution> | undefined;

  constructor(private airPollutionFacadeService: AirPollutionFacadeService) {}
  
  ngOnInit(): void {
      this.currentAirQuality$ = this.airPollutionFacadeService.currentAirQuality$;
  }
}
