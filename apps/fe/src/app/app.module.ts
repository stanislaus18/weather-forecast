import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { appRoutes } from './app.routes';
import { environment } from '../environment';
import { AppComponent } from './app.component';

import { WeatherModule } from '@weather-forecast/weather';
import { ForecastModule } from '@weather-forecast/forecast';
import { SelectionUiModule } from '@weather-forecast/common-ui';
import { AirPollutionModule } from '@weather-forecast/air-pollution';
import { CommonStateService, ForecastStateModule, WeatherStateModule, AirPollutionStateModule } from '@weather-forecast/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    // Common ui Library
    SelectionUiModule,
    // Weather library
    WeatherModule, 
    WeatherStateModule,
    // Forecast Library
    ForecastModule,
    ForecastStateModule,
    // Air Pollution Library
    AirPollutionModule,
    AirPollutionStateModule,
    // Nx plugins
    environment.plugins,
    NgxsModule.forRoot([CommonStateService]),
    NgxsDispatchPluginModule.forRoot(),
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
