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

async function getOnline(serverId) {
    try {
        const response = await axios.get('https://backend.arizona-rp.com/server/get-all', {
            headers: {
                'Referer': 'https://arizona-rp.com/'
            }
        });


        const data = responce.data;
        return data[serverId].players
    } catch (error) {
        console.error(error);
        return null;
    }
}

bot.onText(/\start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! Use the buttons below to interact with the bot.", {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Generate Nickname', callback_data: 'generate'}],
                [{text: 'Get Online Info', callback_data: 'online_0'}]
            ]
        }
    });
});

bot.on('callback_query', async (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;

    if (data === 'generate') {
        const nickname = generateNickname();
        bot.sendMessage(msg.chat.id, `Your GTA SAMP nickname is: ${nickname}`);
    } else if (data.startWith('online_')) {
        const serverId = parseInt(data.split('_')[1], 10);
        const players = await getOnline(serverId);

        if (players !== null) {
            bot.sendMessage(msg.chat.id, `Server ${serverId} has ${players} players online.`);   
        } else {
            bot.sendMessage(msg.chat.id, `Failed to fetch online data for server ${serverId}.`);
        }
    }

    bot.answerCallbackQuery(callbackQuery.id);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (!msg.text.startsWith('/start') && !msg.text.startsWith('/generate') && !msg.text.startsWith('/online')) {
       bot.sendMessage(chatId, 'Use the buttons to interact with the bot or send /start to interact with the bot or send /start to see options.'); 
    }
});