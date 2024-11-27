module.exports = (msg, bot) => {
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
}