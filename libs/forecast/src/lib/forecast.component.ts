import { EChartsOption } from 'echarts';
import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ComingDaysForecast, Forecast } from '@weather-forecast/models';
import { ForecastFacadeService } from '@weather-forecast/store';

import * as echarts from 'echarts';

@Component({
  selector: 'forecast-component',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  comingDaysForecast$: Observable<ComingDaysForecast[]> | undefined;
  todaysForecast$: Observable<Forecast[]> | undefined;

  chartOptionToday: EChartsOption = {};
  chartOptionComingDays: EChartsOption = {};

  constructor(private forecastFacadeService: ForecastFacadeService) { }

  ngOnInit() {
    this.todaysForecast$ = this.forecastFacadeService.todaysForecast$.pipe(tap((data) => this.loadTodaysVisualization(data)));
    this.comingDaysForecast$ = this.forecastFacadeService.comingDaysForecast$.pipe(tap((data) => this.loadComingDaysVisualization(data)));
  }

  private loadTodaysVisualization(forecast: Forecast[]) {
    this.chartOptionToday = {
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

  private loadComingDaysVisualization(comingDaysForecast: ComingDaysForecast[]) {
    this.chartOptionComingDays =  {
      color: ['#80FFA5', '#00DDFF' ],
      title: {
        text: 'Coming days forecast'
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
          data: comingDaysForecast.map(fc => fc.date)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Temperature Min',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: comingDaysForecast.map(fc => fc.temperatureMin)
        },
        {
          name: 'Temperature Max',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: comingDaysForecast.map(fc => fc.temperatureMax)
        }
      ]
    };
  }
}
