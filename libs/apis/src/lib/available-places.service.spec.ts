import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideAutoSpy, Spy } from 'jest-auto-spies';

import { AvailablePlaceService } from './available-places.service';

describe('AvailablePlaceService : ', () => {
    let service: AvailablePlaceService;
    let httpClientSpy: Spy<HttpClient>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AvailablePlaceService,
                provideAutoSpy(HttpClient, {
                    methodsToSpyOn: ['get']
                })
            ],
        }).compileComponents();

        service = TestBed.inject(AvailablePlaceService);
        httpClientSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    });

    it('should create', () => {
        // assert
        expect(service).toBeTruthy();
    });

    it('getUsStateCapitals should call http get with specified url', () => {
        // arrange
        const expectedURL = 'assets/us-state-capitals.json';

        // act
        service.getUsStateCapitals();

        // assert
        expect(httpClientSpy.get).toHaveBeenCalledWith(expectedURL);
    });
});
