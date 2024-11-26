require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const commands = ['/start', '/generate', '/discord', '/forum', '/ip',]
const chatStates = {};
const requiredChannelId = '@princeofscalxq';
const { responses1, responses2, responses3, responses4 } = require('./responses.js');

console.log('Bot has been started...')

const firstNames = ["Amaterasu", "Sora", "Emperor", "Hiroshi", "Amethyst", "Playada", "Adaptive", "Rebellious", "Dagon", "Saint", "Chrome", "Manera", "Arata", "Phantom", "Mamora", "Shirou", "Infused", "Jeffrey", "Shadow", "Neri",  "Kizaru", "Marco", "Amalion", "Kichiro", "Everlasting", "Trap",];
const lastNames = ["Cartier", "Explorer", "Blacksimens", "Cult", "Castle", "Bennett", "Cho", "Northside", "Eternal", "Devilside", "Destruction", "Flame", "Violence", "Recovery", "Armano", "Takeda", "Soyama", "Hellatrigger", "Skywalker", "Hennessy", "Columb", "Laurent", "Hayashi", "Nakata", "Cardinal", "Agressive", "Immortal", "Antisocial", "Antihype", "Unaffected", "Newlight", "Worldwide", "Illuminator"];

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

// Обработка команд
bot.onText(/\/start/, (msg) => handleCommand(msg, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Привет, благодарю за подписку на канал моей команды @princeofscalxq для отслеживания обновлений, фиксов багов и прочих новостей о боте. Теперь вы сможете полноценно использовать нашего бота.", {
        reply_markup: {
            keyboard: [
                [{ text: '🛠 Сгенерировать никнейм' }],
                [{ text: '🔐 Сгенерировать пароль' }],
                [{ text: '📡 Дискорд сервер' }],
                [{ text: '📃 Форум сервер' }],
                [{ text: '🖥 Серверы' }],
                [{ text: '🛡 Администрация сервера'}]
            ],
            resize_keyboard: true
        }
    });
}));

// Обработка сообщений только из личных чатов
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Проверка, что сообщение приходит из личного чата
    if (msg.chat.type !== 'private') {
        return; // Игнорируем сообщения из групп
    }

    if (await isUserSubscribed(userId)) {
        const text = msg.text;

        if (text === '🛠 Сгенерировать никнейм') {
            const nickname = generateNickname();
            bot.sendMessage(chatId, `🤖 Ваш никнейм: ${nickname}`);
        } else if (text === '🔐 Сгенерировать пароль') {
            const passwordLength = 12;
            const password = generatePassword(passwordLength);
            bot.sendMessage(chatId, `🔐 Ваш пароль для любого сервиса, подойдёт и для аризоны: ${password}`);
        } else if (text === '📡 Дискорд сервер') {
            bot.sendMessage(chatId, '🎭 Выберите сервер, который вас интересует (Их всего 30).', {
                reply_markup: {
                    keyboard: generateServerButtons(31),
                    resize_keyboard: true
                }
            });
            chatStates[chatId] = 'waiting_for_number1';
        } else if (text === '📃 Раздел форума') {
            bot.sendMessage(chatId, '🎭 Выберите сервер, форум которого вас интересует (Их всего 30).', {
                reply_markup: {
                    keyboard: generateServerButtons(31),
                    resize_keyboard: true
                }
            });
            chatStates[chatId] = 'waiting_for_number2';
        } else if (text === '🖥 Айпи серверов') {
            bot.sendMessage(chatId, '🎭 Выберите сервер, айпи которого вас интересует', {
                reply_markup: {
                    keyboard: generateServerButtons(31),
                    resize_keyboard: true
                }
            });
            chatStates[chatId] = 'waiting_for_number3';
        } else if (text === '🛡 Администрация сервера') {
            bot.sendMessage(chatId, '🎭 Выберите сервер, список администрации которого вас интересует', {
                reply_markup: {
                    keyboard: generateServerButtons(31),
                }
            });
            chatStates[chatId] = 'waiting_for_number4';
        } else if (!commands.includes(text)) {
            handleServerResponse(chatId, text);
        }
    } else {
        bot.sendMessage(chatId, `Вы должны быть подписаны на канал ${requiredChannelId} для использования этого бота.`);
    }
});


function generateServerButtons(count) {
  const buttons = [];
  for (let i = 1; i <= count; i++) {
      buttons.push([{ text: `${i}` }]);
  }
  return buttons;
}

function handleServerResponse(chatId, text) {
  if (/^\d+$/.test(text)) {
      const value = parseInt(text, 10);
      let response;

      if (chatStates[chatId] === 'waiting_for_number1') {
          response = responses1[value];
      } else if (chatStates[chatId] === 'waiting_for_number2') {
          response = responses2[value];
      } else if (chatStates[chatId] === 'waiting_for_number3') {
          response = responses3[value];
      } else if(chatStates[chatId] === 'waiting_for_number4') {
        response = responses4[value];
      }

      if (response && value >= 1 && value <= 31) {
          bot.sendMessage(chatId, response);
          delete chatStates[chatId];
          bot.sendMessage(chatId, 'Что бы вы хотели сделать дальше?', {
              reply_markup: {
                  keyboard: [
                      [{ text: '🛠 Сгенерировать никнейм' }],
                      [{ text: '🔐 Сгенерировать пароль' }],
                      [{ text: '📡 Дискорд сервер' }],
                      [{ text: '📃 Раздел форума' }],
                      [{ text: '🖥 Айпи серверов' }],
                      [{ text: '🛡 Администрация сервера'}]
                  ],
                  resize_keyboard: true
              }
          });
      } else {
          bot.sendMessage(chatId, 'Пожалуйста, выберите значение от 1 до 31.');
      }
  } else {
      bot.sendMessage(chatId, 'Пожалуйста, введите значение от 1 до 31.');
  }
}

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});