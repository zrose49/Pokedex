import { State } from "./state";

export function commandExit(state: State) {
    console.log("\n");
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    process.exit(0);
};