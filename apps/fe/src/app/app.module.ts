import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

import { SelectionUiModule } from '@weather-forecast/common-ui';
import { CommonStateService, WeatherStateModule } from '@weather-forecast/store';
import { WeatherModule } from '@weather-forecast/weather';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { environment } from '../environment';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    SelectionUiModule,
    WeatherModule, 
    WeatherStateModule,
    environment.plugins,
    NgxsModule.forRoot([CommonStateService]),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
