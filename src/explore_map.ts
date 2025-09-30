import { State } from "./state";

export async function commandExplore(state:State, ...args: string[]) {
if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }
console.log(args);
    let locationAreaString = args[0];
    console.log(`Exploring ${locationAreaString}...`);
    let response = await state.pokeapi.fetchLocation(locationAreaString);
    //console.log(response);

    if(response) {
    console.log("Found Pokemon:");
    let pokemon_encounters = response.pokemon_encounters;

    for(const encounter of pokemon_encounters) {
        console.log(`- ${encounter.pokemon.name}`);
    }

}
}