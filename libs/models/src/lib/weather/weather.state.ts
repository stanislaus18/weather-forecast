import { CurrentWeather } from './current-weather';
export interface WeatherState {
    currentWeather: CurrentWeather | undefined;
    description: string | undefined;
    // other business variables
}