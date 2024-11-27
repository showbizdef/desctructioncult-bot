require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});

const { isUserSubscribed, requiredChannelId, commands, chatStates } = require('./src/config');
const messageHandler = require('./handlers/messageHandler');
const startCommandHandler = require('./src/handlers/startCommandHandler');
const { discord_servers } = ('src/data/discord.js')
const { forum_pages }  =('src/data/forum.js')
const { ip_adress } = ('src/data/ipadress.js')
const { managament } = ('src/data/management.js')
const { firstNames } = ('src/nickname/fistname.js')
const { lastNames } = ('src/nickname/lastname.js')

bot.on('message', async (msg) => {
    await messageHandler(bot, msg, chatStates, requiredChannelId, commands, isUserSubscribed);
});

startCommandHandler(bot);

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});