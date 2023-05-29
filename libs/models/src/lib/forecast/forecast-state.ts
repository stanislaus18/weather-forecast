import { Forecast } from './forecast';
import { ComingDaysForecast } from './coming-days-forecast';

export interface ForecastState {
    comingDaysForecast: ComingDaysForecast[];
    todaysForecast: Forecast[];
}
