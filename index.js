require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const commands = ['/start', '/generate', '/discord', '/forum', '/ip',]
const { responses1, responses2, responses3}  = require('./responses.js')
const chatStates = {};

console.log('Bot has been started...')

const firstNames = ["Amaterasu", "Sora", "Emperor", "Hiroshi", "Amethyst", "Playada", "Adaptive", "Rebellious", "Yamato", "Dagon", "Katsu", "Saint", "Chrome", "Manera", "Arata", "Phantom", "Mamora", "Shirou", "Infused", "Jeffrey", "Shadow", "Neri", "Nik"];
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
    bot.sendMessage(msg.chat.id, `Ваш никнейм для аризоні єрпє: ${nickname}`);
});

bot.onText(/\/password/, (msg) => {
    const passwordLength = 12;
    const password = generatePassword(passwordLength);
    bot.sendMessage(msg.chat.id, `Ваш пароль на любий сервіс, мені похуй: ${password}`);
});

bot.onText(/\/discord/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите сервер, который вас интересует (Их всего 30).');
    chatStates[chatId] = 'waiting_for_number1';
})

bot.onText(/\/forum/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите сервер, форум которого вас интересует (Их всего 30).');
    chatStates[chatId] = 'waiting_for_number2';
})

bot.onText(/\/servers/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Выберите сервер, айпи которого вас интересует');
    chatStates[chatId] = 'waiting_for_number3';
})

bot.on('message', (msg) => {
    const chatId  = msg.chat.id;
    const text = msg.text;

    if(!commands.includes(text) && chatStates[chatId] === 'waiting_for_number1') {

        if(/^\d+$/.test(text)) {
            const value = parseInt(text, 10);
    
            if (value >= 1 && value <= 30) {
                const response = responses1[value];
                bot.sendMessage(chatId, response);
                delete chatStates[chatId];
            } else {
                bot.sendMessage(chatId, 'Пожалуйста, выберите сервер от 1 до 30, а не ебучий бонусник.')
            }
    }
}
else if (!commands.includes(text) && chatStates[chatId] === 'waiting_for_number2') {
    if (/^\d+$/.test(text)) {
      const value = parseInt(text, 10);

      if (value >= 1 && value <= 30) {
        const response = responses2[value];
        if (response) {
          bot.sendMessage(chatId, response);
        } else {
          bot.sendMessage(chatId, 'Ответ для этого значения не найден.');
        }
        delete chatStates[chatId];
      } else {
        bot.sendMessage(chatId, 'Пожалуйста, выберите значение от 1 до 30.');
      }
    } else {
      bot.sendMessage(chatId, 'Пожалуйста, введите команду или значение от 1 до 30.');
    }
  }
else if (!commands.includes(text) && chatStates[chatId] === 'waiting_for_number3') {
    if (/^\d+$/.test(text)) {
        const value = parseInt(text, 10);

        if (value >= 1 && value <= 30) {
            const response = responses3[value];
            if(response) {
                bot.sendMessage(chatId, response);
            } else {
                bot.sendMessage(chatId, 'Ответ для этого значения не найден.');
            }
            delete chatStates[chatId]; 
        } else {
            bot.sendMessage(chatId, 'Пожалуйста, выберите сервер от 1 до 30.');
            
        }
    } else {
        bot.sendMessage(chatId, 'Пожалуйста, введите команду или сервер от 1 до 30.');
    }
}
});
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});
