export const command = {
  name: "themes",
  description: "Displays all available cards themes.",
  permission: "None",
  context: "None",
  category: "Github Stats",
  options: [],

  async run(bot, interaction) {
    await interaction.deferReply();

    let themes_str = "";

    bot.themes.forEach(theme => {
      themes_str += `\n\`${theme}\``;
    });

    let Embed = {
      color: bot.color,
      title: `Available cards themes`,
      author: {
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      },
      description: themes_str,
      thumbnail: {
        url: bot.user.displayAvatarURL({ dynamic: true }),
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: `/themes`,
        iconURL: bot.user.displayAvatarURL({ dynamic: true }),
      },
    };

    await interaction.editReply({ embeds: [Embed] });
  }
}
