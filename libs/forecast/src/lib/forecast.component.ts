import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Forecast } from '@weather-forecast/models';
import { ForecastFacadeService } from '@weather-forecast/store';

@Component({
  selector: 'forecast-component',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecastList$: Observable<Forecast[]> | undefined;
  todaysForecast$: Observable<Forecast[]> | undefined;

  constructor(private forecastFacadeService: ForecastFacadeService) { }

  ngOnInit() {
    this.todaysForecast$ = this.forecastFacadeService.todaysForecast$;
    this.forecastList$ = this.forecastFacadeService.forecastList$.pipe(tap(() => {
      setTimeout(() => {
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
            const cloneChild = next.cloneNode(true) as HTMLElement;
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
          }
        });
      })

    }));
  }
}
