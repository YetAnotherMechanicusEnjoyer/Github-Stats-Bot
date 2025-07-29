import { svg2png } from "svg-png-converter";
import { AttachmentBuilder } from "discord.js";

async function svgToPng(url, name) {
  const res = await fetch(url);
  if (res.statusText !== "OK") { return }
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
    },
    {
      type: "string",
      name: "theme",
      description: "Cards theme",
      autocomplete: true,
      required: false
    }
  ],

  async run(bot, interaction, args) {
    await interaction.deferReply();

    const username = args.getString("username");
    if (!username) { return interaction.editReply(`Error: username shouldn't be empty.`); }

    let theme = args.getString("theme");
    if (!theme) { theme = "discord_old_blurple"; }
    if (!bot.themes.get(theme)) { return interaction.editReply(`Error: theme ${theme} does not exists.`); }

    const thumbnail = await fetch(`https://github.com/${username}.png`);
    if (thumbnail.statusText !== "OK") { return interaction.editReply(`Fetch Error: user '${username}' doesn't exist`); }

    const stats = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=${theme}`, 'stats');
    const lang_a = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=${theme}`, 'lang_a');
    const lang_b = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=${theme}`, 'lang_b');
    const graph = await svgToPng(`http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=${theme}`, 'lang_b');

    let Embed = {
      color: bot.color,
      title: `\_\_${username}\_\_'s Github Stats`,
      author: {
        name: interaction.member.user.username,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      },
      description: `\*\*Theme:\*\* \`${theme}\``,
      thumbnail: {
        url: `https://github.com/${username}.png`,
      },
      timestamp: new Date().toISOString(),
      footer: {
        text: `/user-stats username:${username} theme:${theme}`,
        iconURL: bot.user.displayAvatarURL({ dynamic: true }),
      },
    };

    await interaction.editReply({ embeds: [Embed] });
    await interaction.followUp({ files: [graph, stats, lang_a, lang_b] });
  }
}
