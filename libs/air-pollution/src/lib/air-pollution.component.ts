import { Component, OnInit } from '@angular/core';
import { AirPollutionFacadeService } from '@weather-forecast/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'air-pollution-component',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss'],
})
export class AirPollutionComponent implements OnInit {
  airQuality$: Observable<string> | undefined;

  constructor(private airPollutionFacadeService: AirPollutionFacadeService) {}
  
  ngOnInit(): void {
      this.airQuality$ = this.airPollutionFacadeService.airQuality$;
  }
}
