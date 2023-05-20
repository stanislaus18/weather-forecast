import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { SelectionUiModule } from '@weather-forecast/common-ui';
import { CommonStateService, ForecastStateModule } from '@weather-forecast/store';

import { environment } from '../environment';
import { AppComponent } from './app.component';
import { ForecastModule } from '@weather-forecast/forecast';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    // Common ui Library
    SelectionUiModule,
    // Forecast Library
    ForecastModule,
    ForecastStateModule,
    environment.plugins,
    NgxsModule.forRoot([CommonStateService]),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
