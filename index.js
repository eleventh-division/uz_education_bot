const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '591148627:AAEg2PF4gJmxA5kIQgN9Qqc9uhaVmt6AsGc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const artemId = 7186732;
var dialog, chatId, mText;

bot.onText(/\/start/, (msg) =>  {
  var chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Здравствуйте, я могу проинформировать Вас о дистанционном образовании для Узбекистана, \
  а также об очном образовании в других странах. Но пока что бот в разработке, братитесь к нам по контактам:\n\
+998 97 771 66 83 Бекзод Бахтиярович\n\
+998 99 830 91 18 Мохир\n\
+998 94 629 26 28 Дарий', start);
});