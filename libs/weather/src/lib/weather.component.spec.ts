import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jest-auto-spies';

import { WeatherComponent } from './weather.component';
import { CommonFacadeService, WeatherFacadeService } from '@weather-forecast/store';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      providers: [
        provideAutoSpy(WeatherFacadeService),
        provideAutoSpy(CommonFacadeService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
