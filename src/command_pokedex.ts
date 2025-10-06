import { State } from "./state";

export async function commandPokedex(state:State) {
    let pokedex = state.pokedex;
    if(Object.keys(pokedex).length > 0) {
    console.log("Your Pokedex:");
    for(const key in pokedex) {
        console.log(`- ${key}`);
    }
}
else {
    console.log("You haven't caught anything yet!");
}

}