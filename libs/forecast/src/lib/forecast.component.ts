import { Component, OnInit } from '@angular/core';
import { ForecastFacadeService } from '@weather-forecast/store';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'forecast-component',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecastList$: Observable<any> | undefined;

  constructor(private forecastFacadeService: ForecastFacadeService) { }

  ngOnInit() {
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
            const cloneChild = next.cloneNode(true) as any;
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
          }
        });
      })

    }));
  }
}
