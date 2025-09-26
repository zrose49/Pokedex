import { State } from "./state";

export function commandHelp(state: State) {
    console.log("\n");
    console.log("Welcome to the Pokedex!");
    console.log("Here's a list of commands you can type and what they do.\n");
    for(const obj of Object.values(state.commands)) {
        console.log(`Command name: ${obj.name}`);
        console.log(`Description: ${obj.description}\n`);
    }


};