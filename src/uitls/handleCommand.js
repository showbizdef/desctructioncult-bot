module.exports = (msg, callback) => {
  
  console.log(`Обрабатываю команду от пользователя ${msg.from.id}`);

  callback(msg);
};