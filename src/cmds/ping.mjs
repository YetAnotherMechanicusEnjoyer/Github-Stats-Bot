export const command = {
  name: "ping",
  description: "Displays latency",
  permission: "None",
  context: "None",
  category: "Utils",
  options: [],

  async run(_, interaction) {
    await interaction.reply(`Pong: \`${Date.now() - interaction.createdTimestamp}\`ms`);
  }
}
