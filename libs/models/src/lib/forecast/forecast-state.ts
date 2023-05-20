import { ForecastStateList } from './forecast-state-list';

export interface ForecastState {
    forecastList: ForecastStateList[];
    todaysForecast: ForecastStateList[];
}
