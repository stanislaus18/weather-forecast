
export class Forecast {
  temperature: number;
  description: string;
  time: string;

  constructor(temperature: number, description: string, time: string) {
    this.temperature = temperature;
    this.description = description;
    this.time = time;
  }
}


