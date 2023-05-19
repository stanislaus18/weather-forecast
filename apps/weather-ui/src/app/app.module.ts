import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import { WeatherModule } from '@weather-forecast/weather';
import { WeatherStateModule } from '@weather-forecast/store';

import { environment } from '../environment';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    WeatherModule, 
    WeatherStateModule,
    HttpClientModule,
    environment.plugins,
    NgxsModule.forRoot([]),
    NgxsDispatchPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
