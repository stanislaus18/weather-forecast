import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { ForecastComponent } from './forecast.component';

@NgModule({
  imports: [CommonModule, NgxEchartsModule.forChild()],
  declarations: [ForecastComponent],
  exports: [ForecastComponent],
})
export class ForecastModule {}
