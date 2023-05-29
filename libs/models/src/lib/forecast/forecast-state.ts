import { Forecast } from './forecast';

export interface ForecastState {
    forecastList: Forecast[];
    todaysForecast: Forecast[];
}
