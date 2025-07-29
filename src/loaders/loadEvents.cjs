const fs = require("fs")

module.exports = async bot => {

  console.log("[⏳]\x1b[33mEvents Loading...\x1b[0m");
  fs.readdirSync("./src/events").filter(f => f.endsWith(".cjs")).forEach(async file => {

    let event = require(`../events/${file}`)
    bot.on(file.split(".cjs").join(""), event.bind(null, bot))
    console.log(`   [✅]\x1b[32m${file.slice(0, file.length - 4)}\x1b[0m`);
  })
}
