const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require("./src/loaders/loadCommands.cjs");
const loadEvents = require("./src/loaders/loadEvents.cjs");
const loadThemes = require("./src/loaders/loadThemes.cjs");
require('dotenv').config();

bot.commands = new Discord.Collection();
bot.themes = new Discord.Collection();
bot.color = 0x1ec1e6;
bot.login(process.env.TOKEN);

loadThemes(bot);
loadCommands(bot);
loadEvents(bot);
