import { EChartsOption } from 'echarts';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Forecast } from '@weather-forecast/models';
import { ForecastFacadeService } from '@weather-forecast/store';

import * as echarts from 'echarts';

@Component({
  selector: 'forecast-component',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecastList$: Observable<Forecast[]> | undefined;
  todaysForecast$: Observable<Forecast[]> | undefined;

  chartOption: EChartsOption = {};

  constructor(private forecastFacadeService: ForecastFacadeService) { }

  ngOnInit() {
    this.todaysForecast$ = this.forecastFacadeService.todaysForecast$.pipe(tap((data) => this.loadTodaysVisualization(data)));
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

  loadTodaysVisualization(forecast: Forecast[]) {
    this.chartOption = {
      title: {
        text: 'Todays forecast'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Temperature']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: forecast.map(fc => fc.time)
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(224, 62, 76)'
              },
              {
                offset: 1,
                color: 'rgb(255, 191, 0)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: forecast.map(fc => fc.temperature)
        }
      ]
    };
  }
}
