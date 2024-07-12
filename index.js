require('dotenv/config')

const {BOT_TOKEN} = process.env
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const commands = ['/start', '/generate', '/discord']
if (!commands.includes(msg.text)) {}

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
    bot.sendMessage(msg.chat.id, "Arizona SAMP:\nPhoenix [01]: https://discord.gg/arizona-phoenix\nTucson [02]: https://discord.gg/tucson\nScottdale [03]: https://discord.gg/WVNBNUnHpr\nChandler [04]: https://discord.gg/d7cJKa9\nBrainburg [05]: https://discord.gg/brainburg\nSaint-Rose [06]: https://discord.gg/saintrose\nMesa [07]: https://discord.gg/ZCJx7T5\nRed-Rock [08]: https://discord.gg/kp7ENmW\nYuma [09]: https://discord.gg/29Ac9vxFvS\nSurprise [10]: https://discord.gg/tRtNkVq\nPrescott [11]: https://discord.gg/3yawqzxG7d\nGlendale [12]: https://discord.gg/nQaznGz\nKingman [13]: https://discord.gg/kDVyX2K\nWinslow [14]: https://discord.gg/winslow\nPayson [15]: https://discord.gg/HwHxxVkxBc\nGilbert [16]: https://discord.gg/HrXsMHNUf4\nShow-Low [17]: https://discord.gg/arz17\nCasa-Grande [18]: https://discord.gg/yBW4MSYjNP\nPage [19]: https://discord.gg/WzbNWcKQnr\nSun-City [20]: https://discord.gg/JA6FubbMad\nQueen-Creek [21]: https://discord.gg/5ME9YRjP4t\nSedona [22]: https://discord.gg/sedona\nHoliday [23]: https://discord.gg/aZSrYkW9DU\nWednesday [24]: https://discord.gg/arzwd\nYava [25]: https://discord.gg/yava\nFaraway [26]: https://discord.gg/2J7Cq28uXB\nBumble Bee [27]: https://discord.gg/FfxYH5ZHX5\nChristmas [28]: https://discord.gg/arzchristmas\nMirage [29]: https://discord.gg/4n2ZT4DTVt\nLove [30]: https://discord.com/invite/T4kH3b6DxP")
})

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});
