import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ForecastStateService } from './forecast.state';

@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forFeature([ForecastStateService])
    ]
})
export class ForecastStateModule {}