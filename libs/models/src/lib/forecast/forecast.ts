import { City } from './city';
import { ForecastList } from './forecast-list';

export interface Forecast {
    cod: string
    message: number
    cnt: number
    list: ForecastList[]
    city: City
  }

  
  