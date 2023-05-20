import { WeatherElement } from '../common';

export interface WeatherState {
    currentTemperature: number | undefined;
    weather: WeatherElement[];
    // other business variables
}