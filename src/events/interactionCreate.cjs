const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let entry = interaction.options.getFocused()

    if (interaction.commandName === "help") {

      let choices = bot.commands.filter(cmd => cmd.name.includes(entry));
      await interaction.respond(entry === "" ? bot.commands.map(cmd => ({ name: cmd.name, value: cmd.name })) : choices.map(choice => ({ name: choice.name, value: choice.name })));
    }
  }

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    let mod = require(`../cmds/${interaction.commandName}.mjs`);
    let command = mod.command;
    command.run(bot, interaction, interaction.options);
  }
}
