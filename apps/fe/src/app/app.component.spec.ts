import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { AirPollutionFacadeService, CommonFacadeService, ForecastFacadeService, WeatherFacadeService } from '@weather-forecast/store';

const mockUsStateCapitalData = [
  {
    state: 'fakeState1',
    capital: 'fakeCapital1',
    longitude: '32.377716',
    latitude: '-86.300568',
  },
  {
    state: 'fakeState2',
    capital: 'fakeCapital2',
    longitude: '32.377716',
    latitude: '-86.300568',
  }
];

describe('AppComponent', () => {
  let component: AppComponent;
  let commonFacadeServiceSpy: Spy<CommonFacadeService>;
  let weatherFacadeServiceSpy: Spy<WeatherFacadeService>;
  let forecastFacadeServiceSpy: Spy<ForecastFacadeService>;
  let airPollutionFacadeServiceSpy: Spy<AirPollutionFacadeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AppComponent,
        provideAutoSpy(CommonFacadeService, {
          methodsToSpyOn: ['setPlace'],
          observablePropsToSpyOn: ['usStateCapitals$']
        }),
        provideAutoSpy(WeatherFacadeService, {
          methodsToSpyOn: ['getCurrentWeather'],
        }),
        provideAutoSpy(ForecastFacadeService, {
          methodsToSpyOn: ['getForecast'],
        }),
        provideAutoSpy(AirPollutionFacadeService, {
          methodsToSpyOn: ['getAirPollutionData'],
        }),
      ],
    });

    component = TestBed.inject(AppComponent);
    commonFacadeServiceSpy = TestBed.inject(CommonFacadeService) as Spy<CommonFacadeService>;
    weatherFacadeServiceSpy = TestBed.inject(WeatherFacadeService) as Spy<WeatherFacadeService>;
    forecastFacadeServiceSpy = TestBed.inject(ForecastFacadeService) as Spy<ForecastFacadeService>;
    airPollutionFacadeServiceSpy = TestBed.inject(AirPollutionFacadeService) as Spy<AirPollutionFacadeService>;
  });

  it('should set capital and call appropriate methods', done => {
    // arrange 
    commonFacadeServiceSpy.usStateCapitals$.nextOneTimeWith(mockUsStateCapitalData);

    // act
    component.ngOnInit();
    component.usStateCapitals$.subscribe(() => {
      component.selectedCapitals('fakeCapital2');
      
      // assert
      expect(commonFacadeServiceSpy.setPlace).toHaveBeenCalledWith('fakeCapital2', '32.377716', '-86.300568');
      expect(weatherFacadeServiceSpy.getCurrentWeather).toHaveBeenCalledWith('32.377716', '-86.300568');
      expect(forecastFacadeServiceSpy.getForecast).toHaveBeenCalledWith('32.377716', '-86.300568');
      expect(airPollutionFacadeServiceSpy.getAirPollutionData).toHaveBeenCalledWith('32.377716', '-86.300568');

      done();
    });

  });
});
