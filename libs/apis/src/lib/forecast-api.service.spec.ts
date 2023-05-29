import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideAutoSpy, Spy } from 'jest-auto-spies';

import { ForecastApiService } from './forecast-api.service';

describe('ForecastApiService : ', () => {
    let service: ForecastApiService;
    let httpClientSpy: Spy<HttpClient>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ForecastApiService,
                provideAutoSpy(HttpClient, {
                    methodsToSpyOn: ['get']
                })
            ],
        }).compileComponents();

        service = TestBed.inject(ForecastApiService);
        httpClientSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    });

    it('should create', () => {
        // assert
        expect(service).toBeTruthy();
    });

    it('getHourlyForecast should call http get with specified url', () => {
        // arrange
        const expectedURL = 'https://api.open-meteo.com/v1/forecast?latitude=14&longitude=52.01&hourly=temperature_2m,weathercode';

        // act
        service.getHourlyForecast('14', '52.01');

        // assert
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });

    it('getComingDaysForecast should call http get with specified url', () => {
        // arrange
        const expectedURL = 'https://api.open-meteo.com/v1/forecast?latitude=14&longitude=52.01&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=14&timezone=auto';

        // act
        service.getComingDaysForecast('14', '52.01');

        // assert
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });
    
});
