module.exports = async (bot, message) => {
  let prefix = "€";

  let messageArray = message.content.split(" ");
  let commandName = messageArray[0].slice(prefix.length);
  let args = messageArray.slice(1);

  if (!message.content.startsWith(prefix)) return;

  let command = require(`../cmds/${commandName}`);
  if (!command) return message.reply("Error: No such command.");

  command.run(bot, message, args);
}
