import { Component, OnInit } from '@angular/core';
import { PlaceDetails } from '@weather-forecast/models';
import { CommonFacadeService, WeatherFacadeService } from '@weather-forecast/store';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'weather-forecast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather-ui';
  usStateCapitalsDetails: PlaceDetails[] = [];
  usStateCapitals$!: Observable<string[]>;

  constructor(
    private commonFacadeService: CommonFacadeService,
    private weatherFacadeService: WeatherFacadeService,
  ) { }

  ngOnInit() {
    this.usStateCapitals$ = this.commonFacadeService.usStateCapitals$
      .pipe(
        tap(places => this.usStateCapitalsDetails = places),
        map(places => places.map(place => place.capital)));
  }

  selectedCapitals(value: string) {
    const place: PlaceDetails = this.usStateCapitalsDetails.find(e => e.capital === value) as PlaceDetails;
    this.weatherFacadeService.getCurrentWeather(place?.longitude, place?.latitude);
  }
}
