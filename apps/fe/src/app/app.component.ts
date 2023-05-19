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
  title = 'fe';
  usStateCapitalsDetails: PlaceDetails[] = [];
  usStateCapitals$!: Observable<string[]>;

  constructor(
    private commonFacadeService: CommonFacadeService,
    private weatherFacadeService: WeatherFacadeService
    ) { }

  ngOnInit() {
    this.usStateCapitals$ = this.commonFacadeService.usStateCapitals$
      .pipe(
        tap(places => this.usStateCapitalsDetails = places),
        map(places => places.map(place => place.capital)));

    const items = document.querySelectorAll('.carousel .carousel-item');

    items.forEach((el) => {
      // number of slides per carousel-item
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (let i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0]
        }
        const cloneChild = next.cloneNode(true) as any;
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
      }
    })
  }

  selectedCapitals(value: string) {
    const place: PlaceDetails = this.usStateCapitalsDetails.find(e => e.capital === value) as PlaceDetails;
    this.weatherFacadeService.setPlace(place?.capital, place?.longitude, place?.latitude);
  }
}
