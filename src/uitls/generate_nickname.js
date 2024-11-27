module.exports = (msg, bot) => {
    function generateNickname() {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName}_${randomLastName}`;
    }
}