import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ForecastComponent],
  exports: [ForecastComponent],
})
export class ForecastModule {}
