import { Component, OnInit } from '@angular/core';

import { WeatherFacadeService } from '@weather-forecast/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'weather-component',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  currentTemperature$: Observable<number> | undefined;
  
  ngOnInit(): void {
    this.currentTemperature$ = this.weatherFacadeService.currentTemperature$;
  }
  
  constructor(private weatherFacadeService: WeatherFacadeService) {}
}
