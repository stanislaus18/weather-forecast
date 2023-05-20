import { Component, OnInit } from '@angular/core';
import { PlaceDetails } from '@weather-forecast/models';
import { CommonFacadeService, ForecastFacadeService } from '@weather-forecast/store';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'weather-forecast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'forecast-ui';
  usStateCapitalsDetails: PlaceDetails[] = [];
  usStateCapitals$!: Observable<string[]>;

  constructor(
    private commonFacadeService: CommonFacadeService,
    private forecastFacadeService: ForecastFacadeService,
  ) { }

  ngOnInit() {
    this.usStateCapitals$ = this.commonFacadeService.usStateCapitals$
      .pipe(
        tap(places => this.usStateCapitalsDetails = places),
        map(places => places.map(place => place.capital)));
  }

  selectedCapitals(value: string) {
    const place: PlaceDetails = this.usStateCapitalsDetails.find(e => e.capital === value) as PlaceDetails;
    const {longitude, latitude } = place;
    
    this.forecastFacadeService.getForecast(longitude, latitude);
  }
}
