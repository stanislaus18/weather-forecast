import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AirPollutionStateService } from './air-pollution.state';

@NgModule({
    declarations: [],
    imports: [
        NgxsModule.forFeature([AirPollutionStateService])
    ]
})
export class AirPollutionStateModule {}