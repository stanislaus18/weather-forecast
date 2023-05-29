import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideAutoSpy, Spy } from 'jest-auto-spies';

import { WeatherApiService } from './weather-api.service';

describe('WeatherApiService : ', () => {
    let service: WeatherApiService;
    let httpClientSpy: Spy<HttpClient>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WeatherApiService,
                provideAutoSpy(HttpClient, {
                    methodsToSpyOn: ['get']
                })
            ],
        }).compileComponents();

        service = TestBed.inject(WeatherApiService);
        httpClientSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    });

    it('should create', () => {
        // assert
        expect(service).toBeTruthy();
    });

    it('getCurrentWeather should call http get with specified url', () => {
        // arrange
        const expectedURL = 'https://api.open-meteo.com/v1//forecast?latitude=14&longitude=52.01&current_weather=true';

        // act
        service.getCurrentWeather('14', '52.01');

        // assert
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });
    
});
