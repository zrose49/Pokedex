export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let url = `${PokeAPI.baseURL}/location-area`;
    
    let response = await fetch(url, {
        method: "GET",
        //mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    
    return data;
    
} 

  async fetchLocation(locationName: string): Promise<Location> {
    let url = `${PokeAPI.baseURL} + / +${locationName}`;

    let response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        }
    });

    const data = await response.json();

    return data;

  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: [
    {   name: string;
        url: string;
    }
  ]
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: [
    {encounter_method: {
        name: string;
        url: string;
    },
    version_details: [
        {rate: number;
            version: {
                name: string;
                url: string;
            }
        }
    ]

},
    
  ],
  location: {
    name: string;
    url: string;
  },
  names: [
    {
        name: string;
        language: {
            name: string;
            url: string;
        }
    }
  ],
  pokemon_encounters: [
    {
        pokemon: {
            name: string;
            url: string;
        },
        version_details: [
            {version: {
                name: string;
                url: string;
            },
            max_chance: number;
            encounter_details: [
                {
                    min_level: number;
                    max_level: number;
                    conditionvalues: [];
                    chance: number;
                    method: {
                        name: string;
                        url: string;
                    }

                }
            ]
        }

        ]
    }
  ]


};