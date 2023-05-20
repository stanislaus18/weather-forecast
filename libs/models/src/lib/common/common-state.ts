import { PlaceDetails } from './place-details';

export interface CommonState {
    place: string | undefined; 
    latitude: string | undefined; 
    longitude: string | undefined; 
    getUsStateCapitals: PlaceDetails[];
}