import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirPollutionComponent } from './air-pollution.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AirPollutionComponent],
  exports: [AirPollutionComponent]
})
export class AirPollutionModule {}
