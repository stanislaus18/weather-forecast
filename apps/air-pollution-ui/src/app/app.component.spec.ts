import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';

import { AirPollutionFacadeService, CommonFacadeService } from '@weather-forecast/store';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        provideAutoSpy(CommonFacadeService),
        provideAutoSpy(AirPollutionFacadeService)
      ]
    }).compileComponents();

    component = TestBed.inject(AppComponent);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});
