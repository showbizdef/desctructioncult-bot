require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const commands = ['/start', '/generate', '/discord', '/forum', '/ip',]
const { responses1, responses2, responses3, servers}  = require('./responses.js')
const chatStates = {};
const requiredChannelId = '@showb1zdef';

console.log('Bot has been started...')

const firstNames = ["Amaterasu", "Sora", "Emperor", "Hiroshi", "Amethyst", "Playada", "Adaptive", "Rebellious", "Yamato", "Dagon", "Katsu", "Saint", "Chrome", "Manera", "Arata", "Phantom", "Mamora", "Shirou", "Infused", "Jeffrey", "Shadow", "Neri", "Nik"];
const lastNames = ["Edge", "Tatsuki", "Cartier", "Explorer", "Blacksimens", "Cult", "Castle", "Bennett", "Cho", "Northside", "Eternal", "Devilside", "Destruction", "Murasaki", "Violence", "Recovery", "Armano", "Takeda", "Soyama", "Hellwalker"];

async function isUserSubscribed(userId) {
    try {
      const chatMember = await bot.getChatMember(requiredChannelId, userId);
      return ['member', 'administrator', 'creator'].includes(chatMember.status);
    } catch (error) {
      if (error.response && error.response.statusCode === 400) {
        console.error('Ошибка 400: неверный user_id');
      } else {
        console.error('Ошибка при проверке подписки пользователя:', error);
      }
      return false;
    }
  }
  
  async function handleCommand(msg, callback) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
  
    if (await isUserSubscribed(userId)) {
      callback(msg);
    } else {
      bot.sendMessage(chatId, `Вы должны быть подписаны на канал ${requiredChannelId} для использования этого бота.`);
    }
  }
  
  
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

bot.onText(/\/start/, (msg) => handleCommand(msg, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Приветствую, вы успешно подписаны на канал разработчика @showb1zdef для отслеживания обновлений, фиксов багов и прочих новостей о боте. Теперь вы сможете полноценно использовать нашего бота.");
}));

bot.onText(/\/generate/, (msg) => handleCommand(msg, (msg) => {
    const nickname = generateNickname();
    bot.sendMessage(msg.chat.id, `🤖 Ваш никнейм: ${nickname}`);
}));

bot.onText(/\/password/, (msg) => handleCommand(msg, (msg) => {
    const passwordLength = 12;
    const password = generatePassword(passwordLength);
    bot.sendMessage(msg.chat.id, `🔐 Ваш пароль для любого сервиса, подойдёт и для аризоны: ${password}`);
}));

bot.onText(/\/discord/, (msg) => handleCommand(msg, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🎭 Выберите сервер, который вас интересует (Их всего 30).');
    chatStates[chatId] = 'waiting_for_number1';
}));

bot.onText(/\/forum/, (msg) => handleCommand(msg, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🎭 Выберите сервер, форум которого вас интересует (Их всего 30).');
    chatStates[chatId] = 'waiting_for_number2';
}));

bot.onText(/\/servers/, (msg) => handleCommand(msg, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🎭 Выберите сервер, айпи которого вас интересует');
    chatStates[chatId] = 'waiting_for_number3';
}));

bot.on('message', (msg) => {
    const chatId  = msg.chat.id;
    const text = msg.text;
    const userId = msg.from.id

    if(!commands.includes(text) && chatStates[chatId] === 'waiting_for_number1') {

        if(/^\d+$/.test(text)) {
            const value = parseInt(text, 10);
    
            if (value >= 1 && value <= 30) {
                const response = responses1[value];
                bot.sendMessage(chatId, response);
                delete chatStates[chatId];
            } else {
                bot.sendMessage(chatId, '😩 Пожалуйста, выберите сервер от 1 до 30, с другой нумерацией пока что не существует.')
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
                delete chatStates[chatId];
            } else {
                bot.sendMessage(chatId, 'Ответ для этого значения не найден.');
            }
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
