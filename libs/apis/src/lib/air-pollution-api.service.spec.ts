import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideAutoSpy, Spy } from 'jest-auto-spies';

import { AirPollutionApiService } from './air-pollution-api.service';

describe('AirPollutionApiService : ', () => {
    let service: AirPollutionApiService;
    let httpClientSpy: Spy<HttpClient>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AirPollutionApiService,
                provideAutoSpy(HttpClient, {
                    methodsToSpyOn: ['get']
                })
            ],
        }).compileComponents();

        service = TestBed.inject(AirPollutionApiService);
        httpClientSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    });

    it('should create', () => {
        // assert
        expect(service).toBeTruthy();
    });

    it('getAirPollutionData should call http get with specified url', () => {
        // arrange
        const expectedURL = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=14&longitude=15.01&hourly=pm10,pm2_5,us_aqi';

        // act
        service.getAirPollutionData('14', '15.01');

        // assert
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });
});
