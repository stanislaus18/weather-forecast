import { Coord } from '../common';
import { AirPollutionComponent } from './air-pollution-component';

export interface AirPollution {
    coord: Coord;
    list: [{ components: AirPollutionComponent }]
}