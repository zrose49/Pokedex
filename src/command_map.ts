import {State} from "./state";

export async function commandMap(state: State) {
    let locations = await state.pokeapi.fetchLocations();
    console.log(locations);
    let results = locations.results;
    console.log(results);
    for(const obj of results)  {
        console.log(obj.name);
    }
};