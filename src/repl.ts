import { State } from "./state.js";

export function startREPL(state:State) {
    //initial prompt
    state.readline.prompt();

    //start listener
    state.readline.on('line', async (line) => {
  let words = cleanInput(line);   
  if(words.length === 0) {
    state.readline.prompt();
    return;
  }

const commands = state.commands;
const cmd = commands[line];

if(!cmd) {
  console.log(`Unknown command: ${line}`);
  state.readline.prompt();
  return;
}

try  {
  await cmd.callback(state);
  state.readline.prompt();
  return;
}
  catch(e) {
    console.log(e);
  }
  
});
}

export function cleanInput(string: string):string[] {
    let splitString = string.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');
    //console.log(splitString);
    return splitString;
}

