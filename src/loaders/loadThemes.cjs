module.exports = async bot => {
  console.log("\n[⏳]\x1b[33mThemes Loading...\x1b[0m");
  const themes = require("../assets/themes.json").themes;
  themes.forEach(theme => {
    if (typeof theme !== "string") throw new TypeError(`Theme ${theme} doesn't have a name !`)
    bot.themes.set(theme, theme);
    console.log(`   [✅]\x1b[32m${theme}\x1b[0m`);
  });
}
