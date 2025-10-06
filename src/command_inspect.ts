import {State} from "./state";

export async function commandInspect(state: State, ...args:string[]) {
  if(args.length !== 1) {
    throw new Error("You must provide a Pokemon name!");
  }
  
  let displayName = args.join(" ");
  let pokemonName = args.join("-");
  console.log(pokemonName);

  if(state.pokedex[pokemonName]) {
    let pokeObject = state.pokedex[pokemonName];

    console.log(`Name: ${pokeObject.name}`);
    console.log(`Height: ${pokeObject.height}`);
    console.log(`Weight: ${pokeObject.weight}`);
    console.log("Stats:");
    for(const stat of pokeObject.stats) {
        console.log(`-${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for(const type of pokeObject.types) {
        console.log(`- ${type.type.name}`);
    }

  }
  else {
    console.log(`You have not caught ${displayName} yet!`);
  }
}