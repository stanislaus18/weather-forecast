import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { provideAutoSpy } from 'jest-auto-spies';
import { CommonFacadeService, ForecastFacadeService } from '@weather-forecast/store';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        provideAutoSpy(CommonFacadeService),
        provideAutoSpy(ForecastFacadeService)
      ]
    }).compileComponents();

    component = TestBed.inject(AppComponent);
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });
});
