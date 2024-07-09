require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});

console.log('Bot has been started...')

const firstNames = ["Amaterasu", "Sora", "Emperor", "Hiroshi", "Amethyst", "Playada", "Adaptive", "Rebellious", "Yamato", "Dagon", "Katsu", "Saint", "Chrome", "Manera", "Arata", "Phantom", "Mamora", "Shirou", "Infused", "Jeffrey", "Shadow", "Neri"];
const lastNames = ["Edge", "Tatsuki", "Cartier", "Explorer", "Blacksimens", "Cult", "Castle", "Bennett", "Cho", "Northside", "Eternal", "Devilside", "Destruction", "Murasaki", "Violence", "Recovery", "Armano", "Takeda", "Soyama", "Hellwalker"];

function generateNickname() {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}_${randomLastName}`;
}

function generatePassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome! Send /generate to get a nickname.");
});

bot.onText(/\/generate/, (msg) => {
    const nickname = generateNickname();
    bot.sendMessage(msg.chat.id, `Your GTA SAMP nickname is: ${nickname}`);
});

bot.onText(/\/password/, (msg) => {
    const passwordLength = 12;
    const password = generatePassword(passwordLength);
    bot.sendMessage(msg.chat.id, `Your password is: ${password}`);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(!msg.text.startsWith('/start') && !msg.text.startsWith('/generate') && !msg.text.startsWith('/password')) {
       bot.sendMessage(chatId, 'Use the commands to interact with the bot or send /start to see options.'); 
    }
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});
