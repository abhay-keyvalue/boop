export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  data?: ItineraryData;
  medias?: Media[];
  timestamp?: number;
}

export interface ItineraryData {
  tripName: string;
  tripDescription?: string;
  tripCoverImage?: string;
  startLocation: {name: string; latitude: number; longitude: number};
  endLocation: {name: string; latitude: number; longitude: number};
  stops: {
    location: {name: string; latitude: number; longitude: number};
    duration: string;
  }[];
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Stop {
  location: Location;
  duration: string;
}

export interface Itinerary {
  tripName: string;
  startLocation: Location;
  endLocation: Location;
  stops: Stop[];
}

export interface AIResponse {
    response: string;
    itineraryLocations?: {
      id: number;
      title: string;
      description: string;
      latitude: number;
      longitude: number;
    }[];
};

export interface Media {
    name?: string;
    uri: string;
    album?: string;
    date?: string;
}
