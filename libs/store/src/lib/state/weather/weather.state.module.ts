import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { WeatherStateService } from './weather.state';

@NgModule({
    imports: [
        NgxsModule.forFeature([WeatherStateService])
    ]
})
export class WeatherStateModule {}