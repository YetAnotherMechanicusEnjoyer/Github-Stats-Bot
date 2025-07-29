const loadSlashCommands = require("../loaders/loadSlashCommands.cjs")

module.exports = async bot => {

  await loadSlashCommands(bot)

  console.log(`\n\x1b[4;36m${bot.user.tag} is online.\x1b[0m`);
}
