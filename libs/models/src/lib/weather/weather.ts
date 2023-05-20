import { Clouds, Coord, Main, Rain, Sys, WeatherElement, Wind } from '../common';

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
