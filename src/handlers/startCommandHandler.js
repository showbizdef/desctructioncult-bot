const handleCommand = require("../uitls/handleCommand")

module.exports = (bot) => {
    bot.onText(/\start/, (msg) => {
        handleCommand(msg, (msg) => {
            bot.sendMessage(msg.chat.id, "👋 Привет, благодарю за подписку на канал моей команды @princeofscalxq для отслеживания обновлений, фиксов багов и прочих новостей о боте. Теперь вы сможете полноценно использовать нашего бота.", {
                reply_markup: {
                    keyboard: [
                        [{ text: '🛠 Сгенерировать никнейм' }],
                        [{ text: '🔐 Сгенерировать пароль' }],
                        [{ text: '📡 Дискорд сервер' }],
                        [{ text: '📃 Форум сервер' }],
                        [{text: '🖥 Серверы'}],
                        [{ text: '🛡 Администрация сервера'}]
                    ],
                    resize_keyboard: true

                }
            });
        });
    });
};