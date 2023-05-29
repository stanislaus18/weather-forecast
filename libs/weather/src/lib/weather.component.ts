import { filter, Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { WeatherElement } from '@weather-forecast/models';
import { CommonFacadeService, WeatherFacadeService } from '@weather-forecast/store';

@UntilDestroy()
@Component({
  selector: 'weather-component',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather: WeatherElement | undefined;

  currentPlace$: Observable<string> | undefined;
  description$: Observable<string> | undefined;
  currentTemperature$: Observable<number> | undefined;

  ngOnInit(): void {
    this.currentTemperature$ = this.weatherFacadeService.currentTemperature$;
    this.description$ = this.weatherFacadeService.description$;
    this.currentPlace$ = this.commonFacadeService.currentPlace$;
  }

  constructor(
    private weatherFacadeService: WeatherFacadeService,
    private commonFacadeService: CommonFacadeService) { }
}
