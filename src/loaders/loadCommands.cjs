const fs = require("fs")

module.exports = async bot => {

  console.log("\n[⏳]\x1b[33mCommands Loading...\x1b[0m");
  fs.readdirSync("./src/cmds").filter(f => f.endsWith(".mjs")).forEach(async file => {

    let mod = require(`../cmds/${file}`);
    let command = mod.command;
    if (!command.name || typeof command.name !== "string") throw new TypeError(`La commande ${file.slice(0, file.length - 4)} n'a pas de nom !`)
    bot.commands.set(command.name, command)
    console.log(`   [✅]\x1b[32m${file.slice(0, file.length - 4)}\x1b[0m`);
  })
}
