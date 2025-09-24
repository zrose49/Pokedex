import { createInterface } from "node:readline";

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Enter your prompt ",
    });

    rl.prompt();

    rl.on('line', (line) => {
  //console.log(`Received: ${line}`);
  if(line.length === 0) {
    rl.prompt();
    return;
  }

  let result = cleanInput(line);
  console.log(`Your command was: ${result[0]}`);

  rl.prompt();
});
}


export function cleanInput(string: string):string[] {
    let splitString = string.replace(/\s+/g, ' ').trim().toLowerCase().split(' ');
    //console.log(splitString);
    return splitString;
}

//export {};