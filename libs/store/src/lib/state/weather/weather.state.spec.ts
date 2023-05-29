import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { WeatherApiService } from '@weather-forecast/apis';
import { WeatherStateService } from './weather.state';
import { GetCurrentWeather } from './weather.actions';
import { Weather } from '@weather-forecast/models';

const mockData = {
  current_weather:{
    temperature:22.9,
    weathercode:0,
    time:"2023-05-29T14:00"
  }
};

describe('WeatherState : ', () => {
  let store: Store;
  let weatherApiServiceSpy: Spy<WeatherApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([WeatherStateService]), NgxsDispatchPluginModule.forRoot()],
      providers: [
        provideAutoSpy(WeatherApiService, {
          methodsToSpyOn: ['getCurrentWeather'],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    weatherApiServiceSpy = TestBed.inject(WeatherApiService) as Spy<WeatherApiService>;
    
    // fake return the data
    weatherApiServiceSpy.getCurrentWeather.nextWith(mockData as Weather);
  });

  it('WeatherState : should be defined', () => {
    // act
    const storeSnapshot = store.selectSnapshot(WeatherStateService);

    // assert
    expect(storeSnapshot).toBeTruthy();
  });

  describe('Actions', () => {
    it('WeatherState : getCurrentWeather should call the getCurrentWeather api service', () => {
      // act 
      store.dispatch(new GetCurrentWeather('32.37276', '-86.297'));
  
      // assert
      expect(weatherApiServiceSpy.getCurrentWeather).toHaveBeenCalledWith('32.37276', '-86.297');
    });
  
    it('WeatherState : getCurrentWeather should set the state', () => {
      // arrange
      const expectedObject = {
        currentWeather:{
          temperature: 22.9, 
          weathercode: 0, 
          time: '2023-05-29T14:00'
        },
        description:'Clear sky'
      };
      // act 
      store.dispatch(new GetCurrentWeather('32.37276', '-86.297'));
  
      // assert
      const storeSnapshot = store.selectSnapshot(WeatherStateService);
      expect(storeSnapshot).toMatchObject(expectedObject);
    });
  });
});