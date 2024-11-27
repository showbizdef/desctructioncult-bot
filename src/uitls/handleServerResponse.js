module.exports = (msg, bot) => {
    function handleServerResponse(chatId, text) {
        if (/^\d+$/.test(text)) {
            const value = parseInt(text, 10);
            let response;
      
            if (chatStates[chatId] === 'waiting_for_number1') {
                response = discord_servers[value];
            } else if (chatStates[chatId] === 'waiting_for_number2') {
                response = forum_pages[value];
            } else if (chatStates[chatId] === 'waiting_for_number3') {
                response = ip_adress[value];
            } else if(chatStates[chatId] === 'waiting_for_number4') {
              response = managament[value];
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
}