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

  async fetchPokemon(pokemonName:string): Promise<any> {
    let url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    
    const cachedResponse = this.cache.get<Pokemon>(url);
    if(cachedResponse) {
        return cachedResponse;
    }

    try {
    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        }
    });

    if(!response.ok) {
        throw new Error(`Pokemon API failed with: ${response.status} ${response.statusText}`);
    }


    let pokemonData = await response.json();
    this.cache.add(url,pokemonData);

    return pokemonData;
}
catch(e) {
console.log((e as Error).message);
}
}
}

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: any;
    back_shiny: string;
    back_shiny_female: any;
    front_default: string;
    front_female: any;
    front_shiny: string;
    front_shiny_female: any;
    other: {
      dream_world: {
        front_default: string;
        front_female: any;
      };
      home: {
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
      };
      official_artwork: {
        front_default: string;
        front_shiny: string;
      };
    };
    versions: {
      [generation: string]: {
        [game: string]: {
          back_default: string;
          back_female?: any;
          back_shiny: string;
          back_shiny_female?: any;
          front_default: string;
          front_female?: any;
          front_shiny: string;
          front_shiny_female?: any;
        };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};

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