const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require("./src/loaders/loadCommands.cjs");
const loadEvents = require("./src/loaders/loadEvents.cjs");
require('dotenv').config();

bot.commands = new Discord.Collection();
bot.profiles = new Discord.Collection();
bot.color = "#1EC1E6";
bot.login(process.env.TOKEN);

loadCommands(bot);
loadEvents(bot);
