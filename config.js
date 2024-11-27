const isUserSubscribed = require("./uitls/isUserSubscribed");

module.exports = {
    requiredChannelId: '@princeofscalxq',
    commands: ['🛠 Сгенерировать никнейм', '🔐 Сгенерировать пароль', '📡 Дискорд сервер', '📃 Раздел форума', '🖥 Айпи серверов', '🛡 Администрация сервера'],
    chatStates: {},
    isUserSubscribed: async(userId) => {
        return true;
    }
};