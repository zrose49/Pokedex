import { State } from "./state";

export async function commandExit(state: State) {
    console.log("\n");
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    process.exit(0);
};