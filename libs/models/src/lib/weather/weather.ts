import { Sys } from './sys';
import { Wind } from './wind';
import { Main } from './main';
import { Rain } from './rain';
import { Coord } from './coord';
import { Clouds } from './clouds';
import { WeatherElement } from './weather-element';

export interface Weather {
    coord:      Coord;
    weather:    WeatherElement[];
    base:       string;
    main:       Main;
    visibility: number;
    wind:       Wind;
    rain:       Rain;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}
