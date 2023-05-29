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
  private baseUrl = 'http://openweathermap.org/img/w/';
  imageUrl: SafeResourceUrl | undefined;
  weather: WeatherElement | undefined;

  currentPlace$: Observable<string> | undefined;
  description$: Observable<string> | undefined;
  currentTemperature$: Observable<number> | undefined;

  ngOnInit(): void {
    this.currentTemperature$ = this.weatherFacadeService.currentTemperature$;
    this.description$ = this.weatherFacadeService.description$;
    this.currentPlace$ = this.commonFacadeService.currentPlace$;
    
    // this.setWeatherDetails();
  }

  // private setWeatherDetails() {
  //   this.weatherFacadeService.weather$
  //     .pipe(
  //       untilDestroyed(this),
  //       filter(weather => weather?.length > 0))
  //     .subscribe(weather => {
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.baseUrl}${weather[0].icon}.png`);
  //       this.weather = weather[0];
  //     });
  // }

  constructor(
    private weatherFacadeService: WeatherFacadeService,
    private commonFacadeService: CommonFacadeService,
    private sanitizer: DomSanitizer) { }
}
