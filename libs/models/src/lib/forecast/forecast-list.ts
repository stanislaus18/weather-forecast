import { Clouds, Main, Rain, Sys, WeatherElement, Wind } from '../common';

export interface ForecastList {
    dt: number
    main: Main
    weather: WeatherElement[]
    clouds: Clouds
    wind: Wind
    visibility: number
    pop: number
    sys: Sys
    dt_txt: string
    rain?: Rain
  }