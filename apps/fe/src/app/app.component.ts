import { Component, OnInit } from '@angular/core';
import { ApiService } from 'libs/store/src/lib/services/api.service';

@Component({
  selector: 'weather-forecast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fe';
  weather = '-';

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getWeather().subscribe(d => {
      this.weather = d.main.temp;
    });

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
}
