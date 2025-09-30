import { describe,test,expect } from "vitest";
import {PokeAPI} from "./pokeapi"

describe.each([
    {
        input: undefined,
        expected: ["https://pokeapi.co/api/v2/location-area?offset=20&limit=20",null],
    }, 
]

)("cleanInput($input)", ({ input, expected }) => {
  test(`Fetch Locations API with no input: ${expected}`, async () => {
    let pokeapi = new PokeAPI(5000);
    let response = await pokeapi.fetchLocations(input);

    expect(response.next).toBe(expected[0]);
    expect(response.previous).toBe(null);
  });
});