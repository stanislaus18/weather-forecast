import { TestBed } from '@angular/core/testing';

import { provideAutoSpy, Spy } from 'jest-auto-spies';

import { ForecastFacadeService } from '@weather-forecast/store';
import { ComingDaysForecast, Forecast } from '@weather-forecast/models';

import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let forecastFacadeServiceSpy: Spy<ForecastFacadeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForecastComponent,
        provideAutoSpy(ForecastFacadeService, {
          observablePropsToSpyOn: ['todaysForecast$', 'comingDaysForecast$'],
        })
      ],
    });

    component = TestBed.inject(ForecastComponent);
    forecastFacadeServiceSpy =  TestBed.inject(ForecastFacadeService) as Spy<ForecastFacadeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadTodaysVisualization with appropriate values', done => {
    // arrange
    const mockData = [{
      time: '12:00',
      temperature: 21.01,
      description: 'clear sky'
    },
    {
      time: '13:00',
      temperature: 19.01,
      description: 'outcast'
    }];

    forecastFacadeServiceSpy.todaysForecast$.nextOneTimeWith(mockData as Forecast[])

    // act 
    component.ngOnInit();

    component.todaysForecast$?.subscribe(() => {
      // assert
      expect(component.chartOptionToday).toMatchSnapshot();
      done();
    });
  });

  it('loadComingDaysVisualization with appropriate values', done => {
    // arrange
    const mockData = [{
      date: '2023-08-21',
      temperatureMax: 21.01,
      temperatureMin: 19.1
    },
    {
      date: '2023-08-21',
      temperatureMax: 19.01,
      temperatureMin: 17.9
    }];

    forecastFacadeServiceSpy.comingDaysForecast$.nextOneTimeWith(mockData as ComingDaysForecast[])

    // act 
    component.ngOnInit();

    component.comingDaysForecast$?.subscribe(() => {
      // assert
      expect(component.chartOptionComingDays).toMatchSnapshot();
      done();
    });
  });
});
