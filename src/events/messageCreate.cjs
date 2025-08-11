module.exports = async (bot, message) => {
  let prefix = "€";

  let messageArray = message.content.split(" ");
  let commandName = messageArray[0].slice(prefix.length);
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;

  let mod;
  try {
    mod = require(`../cmds/${commandName}.mjs`);
    mod.command.run(bot, message, args);
  } catch {
    message.reply(`Error: \"${commandName}\" No such command.`);
  }
}
