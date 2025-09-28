import {State} from "./state";

export async function commandMapForward(state: State) {
    let locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for(const location of locations.results)  {
        console.log(location.name);
    }
};

export async function commandMapBackward(state: State) {

    if(!state.prevLocationsURL) {
        throw new Error("You're on the first page");
    }

    let locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);

    state.prevLocationsURL = locations.previous;
    state.nextLocationsURL = locations.next;

    for(const location of locations.results) {
        console.log(location.name);
    }


}