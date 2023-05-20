import { SafeResourceUrl } from '@angular/platform-browser';

export interface ForecastStateList {
    date?: string;
    time?: string;
    temp: string;
    description: string
    image?: SafeResourceUrl;
}