import { State } from "./state";

export async function commandCatch(state: State,...args: string[]) {
    
    let pokemonName = args.join("-");
    //console.log(pokemonName);
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try {
    let pokemonData = await state.pokeapi.fetchPokemon(pokemonName);
    
    //console.log(pokemonData);

    let baseExp = pokemonData.base_experience;
    console.log(baseExp);
    if(didCatch(baseExp)) {
        console.log(`${pokemonName} was caught!`);
        state.pokedex[pokemonName] = pokemonData;
    }
    else {
        console.log(`${pokemonName} escaped!!`);
        console.log("Try again!!!");
    }
}
    //console.log(state.pokedex);
    catch(e) {
    console.log((e as Error).message);
}

}

function didCatch(experienceLevel: number, maxExperience = 255) {
  
  // Normalize the experience level into a probability threshold.
  // A higher experience level results in a lower threshold.
  // We use `maxExperience` to scale the probability.
  const probabilityOfTrue = 1 - (experienceLevel / maxExperience);

  // Use Math.random() to check if the random number falls within the probability range.
  // For example, if probabilityOfTrue is 0.2, the function returns true 20% of the time.
  return Math.random() < probabilityOfTrue;
}