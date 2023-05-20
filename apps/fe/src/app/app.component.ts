import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceDetails } from '@weather-forecast/models';
import { AirPollutionFacadeService, CommonFacadeService, ForecastFacadeService, WeatherFacadeService } from '@weather-forecast/store';
import { interval, map, Observable, startWith, Subscription, tap } from 'rxjs';

@Component({
  selector: 'weather-forecast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fe';
  usStateCapitalsDetails: PlaceDetails[] = [];
  usStateCapitals$!: Observable<string[]>;
  timeInterval: Subscription | undefined;

  constructor(
    private commonFacadeService: CommonFacadeService,
    private weatherFacadeService: WeatherFacadeService,
    private forecastFacadeService: ForecastFacadeService,
    private airPollutionFacadeService: AirPollutionFacadeService
  ) { }

  ngOnInit() {
    this.usStateCapitals$ = this.commonFacadeService.usStateCapitals$
      .pipe(
        tap(places => this.usStateCapitalsDetails = places),
        map(places => places.map(place => place.capital)));
  }

  selectedCapitals(value: string) {
    const place: PlaceDetails = this.usStateCapitalsDetails.find(data => data.capital === value) as PlaceDetails;
    const { longitude, latitude } = place;

    this.commonFacadeService.setPlace(place.capital, longitude, latitude);

    this.timeInterval?.unsubscribe();

    this.timeInterval = interval(5000).pipe(startWith(0)).subscribe(() => {
      this.weatherFacadeService.getCurrentWeather(longitude, latitude);
      this.forecastFacadeService.getForecast(longitude, latitude);
      this.airPollutionFacadeService.getAirPollutionData(longitude, latitude);
    });
  }

  ngOnDestroy(): void {
      this.timeInterval?.unsubscribe();
  }
}
