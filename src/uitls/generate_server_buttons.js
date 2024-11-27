module.exports = (msg, bot) => {
    function generateServerButtons(count) {
        const buttons = [];
        for (let i = 1; i <= count; i++) {
            buttons.push([{ text: `${i}` }]);
        }
        return buttons;
      }
}
