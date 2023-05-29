import { provideAutoSpy } from 'jest-auto-spies';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPollutionFacadeService } from '@weather-forecast/store';

import { AirPollutionComponent } from './air-pollution.component';

describe('AirPollutionComponent', () => {
  let component: AirPollutionComponent;
  let fixture: ComponentFixture<AirPollutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AirPollutionComponent
      ],
      providers: [
        provideAutoSpy(AirPollutionFacadeService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AirPollutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
