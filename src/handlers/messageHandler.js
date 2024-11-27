const { generateNickname, generatePassword, generateServerButtons, handleServerResponse } = require('../uitls');
const isUserSubscribed = require('../uitls/isUserSubscribed');

module.exports = async (bot, msg, chatStates, requiredChannelId, commands, isUserSubscribed) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (msg.chat.type !== 'private') {
        return;
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
};