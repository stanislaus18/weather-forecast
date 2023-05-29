
export class ComingDaysForecast {
  temperatureMax: number;
  temperatureMin: number;
  date: string;

  constructor(temperatureMax: number, temperatureMin: number, date: string) {
    this.temperatureMax = temperatureMax;
    this.temperatureMin = temperatureMin;
    this.date = date;
  }
}

