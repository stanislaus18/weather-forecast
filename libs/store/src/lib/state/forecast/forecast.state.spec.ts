import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { ForecastList } from '@weather-forecast/models';
import { ForecastApiService } from '@weather-forecast/apis';

import { GetHourlyForecast } from './forecast.actions';
import { ForecastStateService } from './forecast.state';

const mockHourlyData = {
  hourly: {
    time: [
      '2023-05-29T00:00',
      '2023-05-29T01:00',
      '2023-05-29T02:00',
      '2023-05-29T03:00',
      '2023-05-29T04:00',
    ],
    temperature_2m: [
      12.8,
      12.1,
      11.3,
      10.5,
      10.5,
    ],
    weathercode: [
      2,
      1,
      3,
      4,
      1
    ]
  }
};

const mockComingDaysData = {
  daily: {
    time: [
      '2023-06-03T00:00',
      '2023-06-04T01:00',
      '2023-06-05T02:00',
      '2023-06-06T03:00',
      '2023-06-07T04:00',
    ],
    temperature_2m_max: [
      12.8,
      12.1,
      11.3,
      10.5,
      10.5,
    ],
    temperature_2m_min: [
      12.0,
      12.0,
      10.3,
      9.5,
      10.0,
    ],
  }
};

describe('ForecastState : ', () => {
  let store: Store;
  let forecastApiServiceSpy: Spy<ForecastApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ForecastStateService]), NgxsDispatchPluginModule.forRoot()],
      providers: [
        provideAutoSpy(ForecastApiService, {
          methodsToSpyOn: ['getHourlyForecast', 'getComingDaysForecast'],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    forecastApiServiceSpy = TestBed.inject(ForecastApiService) as Spy<ForecastApiService>;

    // fake return the data
    forecastApiServiceSpy.getHourlyForecast.nextWith(mockHourlyData as { hourly: ForecastList; });
    forecastApiServiceSpy.getComingDaysForecast.nextWith(mockComingDaysData as { daily: ForecastList; });
  });

  it('ForecastState : should be defined', () => {
    // act
    const storeSnapshot = store.selectSnapshot(ForecastStateService);

    // assert
    expect(storeSnapshot).toBeTruthy();
  });

  describe('Actions', () => {
    it('ForecastState : getHourlyForecast should call the getHourlyForecast api service', () => {
      // act 
      store.dispatch(new GetHourlyForecast('32.37276', '-86.297'));

      // assert
      expect(forecastApiServiceSpy.getHourlyForecast).toHaveBeenCalledWith('32.37276', '-86.297');
    });

    it('ForecastState : getHourlyForecast should set the state', () => {
      // arrange
      const expectedTodaysForecastObject = [
          {
            description: 'Partly cloudy',
            temperature: 12.8,
            time: '00:00',
          },
          {
            description: 'Mainly clear',
            temperature: 12.1,
            time: '01:00',
          },
          {
            description: 'Overcast',
            temperature: 11.3,
            time: '02:00',
          },
          {
            description: undefined,
            temperature: 10.5,
            time: '03:00',
          }, {
            description: 'Mainly clear',
            temperature: 10.5,
            time: '04:00',
          }
        ];
      // act 
      store.dispatch(new GetHourlyForecast('32.37276', '-86.297'));

      // assert
      const storeSnapshot = store.selectSnapshot(ForecastStateService);
      expect(storeSnapshot.todaysForecast).toMatchObject(expectedTodaysForecastObject);
    });

    it('ForecastState : getComingDaysForecast should call the getComingDaysForecast api service', () => {
      // act 
      store.dispatch(new GetHourlyForecast('32.37276', '-86.297'));

      // assert
      expect(forecastApiServiceSpy.getComingDaysForecast).toHaveBeenCalledWith('32.37276', '-86.297');
    });

    it('ForecastState : getComingDaysForecast should set the state', () => {
      // arrange
      const expectedComingDaysObject = [
          {
            date: "2023-06-03T00:00",
            temperatureMax: 12.8,
            temperatureMin: 12,
          },
          {
            date: "2023-06-04T01:00",
            temperatureMax: 12.1,
            temperatureMin: 12,
          },
          {
            date: "2023-06-05T02:00",
            temperatureMax: 11.3,
            temperatureMin: 10.3,
          },
          {
            date: "2023-06-06T03:00",
            temperatureMax: 10.5,
            temperatureMin: 9.5,
          },
          {
            date: "2023-06-07T04:00",
            temperatureMax: 10.5,
            temperatureMin: 10,
          }
        ];
      // act 
      store.dispatch(new GetHourlyForecast('32.37276', '-86.297'));

      // assert
      const storeSnapshot = store.selectSnapshot(ForecastStateService);
      expect(storeSnapshot.comingDaysForecast).toMatchObject(expectedComingDaysObject);
    });
  });
});