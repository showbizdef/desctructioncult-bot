require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

const firstNames = ["Amaterasu", "Sora", "Emperor", "Hiroshi", "Amethyst", "Playada", "Adaptive", "Rebellious", "Yamato", "Dagon", "Katsu", "Saint", "Chrome", "Manera", "Arata", "Phantom", "Mamora", "Shirou", "Infused", "Jeffrey", "Shadow", "Neri"];
const lastNames = ["Edge", "Tatsuki", "Cartier", "Explorer", "Blacksimens", "Cult", "Castle", "Bennett", "Cho", "Northside", "Eternal", "Devilside", "Destruction", "Murasaki", "Violence", "Recovery", "Armano", "Takeda", "Soyama", "Hellwalker"];

function generateNickname() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}_${randomLastName}`;
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Привет!👋\nДля того, чтобы сгенерировать свой никнейм, введите команду /generate");
});

bot.onText(/\/generate/, (msg) => {
    const nickname = generateNickname();
    bot.sendMessage(msg.chat.id, `Ваш никнейм для создания никнейма в игре: ${nickname}`)
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text !== '/start' && msg.text !== '/generate') {
        bot.sendMessage(chatId, 'Пропишите команду /generate для получения никнейма.')
    }
});