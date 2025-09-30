import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }
  closeCache() {
        this.cache.stopReapLoop();
    }


  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

    let url = pageURL || `${PokeAPI.baseURL}/location-area`;

    //check if response exists in cache first and return it if it does
        const cachedResponse= this.cache.get<ShallowLocations>(url);
        console.log(cachedResponse);
        if (cachedResponse) {
        return cachedResponse;
        }
try {
    
    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
    });

    if(!response.ok) {
        throw new Error(`Request failed with ${response.status} ${response.statusText}`);
    }

    const locations: ShallowLocations = await response.json();
    //add response to cache
    this.cache.add(url,locations);
    
    return locations;
}
    catch (e) {
    throw new Error(`Error fetching locations: ${(e as Error).message}`);
}
} 

  async fetchLocation(locationName: string): Promise<Location> {
    let url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cachedResponse = this.cache.get<Location>(url);
    if(cachedResponse) {
        console.log("We cached Yo");
        return cachedResponse;
    }
    try {
        
    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        }
    });

    if(!response.ok) {
    throw new Error(`Request failed with ${response.status} ${response.statusText}`);
    }

    const location: Location = await response.json();
    this.cache.add(url,location);

    return location;
    }
    catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }

  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};