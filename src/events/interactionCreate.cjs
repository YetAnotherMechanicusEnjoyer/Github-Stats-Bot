const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
    let entry = interaction.options.getFocused()

    if (interaction.commandName === "help") {
      const choices = bot.commands.filter(cmd => cmd.name.includes(entry));
      const limitedChoices = entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })).slice(0, 25) : choices.map(choice => ({ name: choice.name, value: choice.name })).slice(0, 25);
      await interaction.respond(limitedChoices);
    }

    if (interaction.commandName === "user-stats") {
      if (!bot.themes || !(bot.themes instanceof Discord.Collection)) {
        return await interaction.respond([]);
      }

      let themes = bot.themes.filter(theme => {
        return (
          typeof theme === 'string' &&
          theme.toLocaleLowerCase().includes(entry.toLowerCase())
        );
      }).map(theme => {
        return ({
          name: theme,
          value: theme
        });
      }).slice(0, 25);

      await interaction.respond(themes);
    }
  }

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    let mod = require(`../cmds/${interaction.commandName}.mjs`);
    let command = mod.command;
    command.run(bot, interaction, interaction.options);
  }
}
