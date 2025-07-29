import { svg2png } from "svg-png-converter";
import { AttachmentBuilder } from "discord.js";

async function svgToPng(url, name) {
  const res = await fetch(url);
  if (!res.ok()) { return }
  const svg = await res.text();
  const png = await svg2png({
    input: svg,
    encoding: 'buffer',
    format: 'png',
    quality: 1,
  })

  return new AttachmentBuilder(png, `${name}.png`);
}

export const command = {
  name: "user-stats",
  description: "Displays a specific user's stats.",
  permission: "None",
  context: "None",
  category: "Github Stats",
  options: [
    {
      type: "string",
      name: "username",
      description: "Username of the targeted user",
      autocomplete: false,
      required: true
    }
  ],

  async run(bot, interaction, args) {
    const username = args.getString("username");
    if (!username) { return interaction.reply(`Error: username shouldn't be empty.`); }

    const thumbnail = await fetch(`https://github.com/${username}.png`);
    if (!thumbnail.ok()) { return interaction.reply("Error: user doesn't exist"); }

    const stats = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=radical`, 'stats');
    const lang_a = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=radical`, 'lang_a');
    const lang_b = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=radical`, 'lang_b');
    const graph = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=radical`, 'lang_b');

    let Embed = {
      color: bot.color,
      title: `${username}'s Github Stats`,
      author: {
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      },
      thumbnail: {
        url: `https://github.com/${username}.png`,
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: `/user-stats ${username}`,
        iconURL: bot.user.displayAvatarURL({ dynamic: true }),
      },
    };

    await interaction.reply({ embeds: [Embed] });
    await interaction.channel.send({ files: [graph] });
    await interaction.channel.send({ files: [stats] });
    await interaction.channel.send({ files: [lang_a] });
    await interaction.channel.send({ files: [lang_b] });
  }
}
