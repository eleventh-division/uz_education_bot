const TelegramBot = require('node-telegram-bot-api');
// const fs = require("fs");
// const sys = require("sys");
const mongoClient = require("mongodb").MongoClient;

const token = '591148627:AAEg2PF4gJmxA5kIQgN9Qqc9uhaVmt6AsGc';

const bot = new TelegramBot(token, {polling: true});

const artemId = 7186732;
var users;
var chatId, mText, mId;

const start = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        '🌏 Дистанционное образование'
      ],
      [
        '📚 Очное образование'
      ],
      [
        '📜 О нас'
      ]
    ]
  })
};

const remote_education_country = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        '🇷🇺 Россия'
      ],
      [
        '🇰🇿 Казахстан'
      ],
      [
        'На главную'
      ]
    ]
  })
};

const admission_to_the_university_country = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      /* [
        '🇷🇺 Россия'
      ], */
      [
        '🇰🇿 Казахстан'
      ],
      [
        'На главную'
      ]
    ]
  })
};

const remote_education_ru = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      /* [
        'НОЧУ ВО МЭИ'
      ],
      [
        'НОЧУ ВО МИП'
      ], */
      [
        'НОЧУ ВО МЭИ и МИП'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
};

const remote_education_kz = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        'КИПУДН'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
};

/* const admission_to_the_university_ru = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        'НОЧУ ВО МЭИ'
      ],
      [
        'НОЧУ ВО МИП'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
}; */

const admission_to_the_university_kz = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        'КИПУДН'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
};

const about = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      /* [
        'Где мы находимся?'
      ], */
      [
        'Контакты'
      ],
      [
        'На главную'
      ]
    ]
  })
};

const default_options = {
  parse_mode: 'Markdown'
}

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Здравствуйте, я могу Вас проинформировать об дистанционном и очном образовании \
в Узбекистане и за рубежом. Выберите пожалуйста то, что Вас интересует.', start);

  users.find({chatId: chatId}).toArray(function(err, results){
    if (err) {
      bot.sendMessage(artemId, 'Произошла ошибка в ходе поиска, возможно не найдены элементы');
      return console.log(err);
    }
    else {
      // bot.sendMessage(artemId, JSON.stringify(results));
      if (results == '') {
        let user = {name: msg.from.first_name, chatId: msg.chat.id, uName: '@' + msg.from.username};
        users.insert(user, function(err, result){
          if(err){
            bot.sendMessage(artemId, 'Ошибка при подключении к коллекции');
            return console.log(err);
          }
          // console.log(result.ops);
        });
      }
    }
  });
});

bot.on('message', (msg) => {
    chatId = msg.chat.id;
    mText = msg.text;
    users.find({chatId: chatId}).toArray(function(err, results){
      //Дистанционное образование
      if (mText == '🌏 Дистанционное образование'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну:', remote_education_country);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'remote_education_country'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }
      //Очное образование
      else if (mText == '📚 Очное образование') {
        bot.sendMessage(chatId, 'Выберите пожалуйста страну:', admission_to_the_university_country);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'admission_to_the_university_country'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }
      //О нас
      else if (mText == '📜 О нас'){ //TMC полностью
      bot.sendMessage(chatId, '\
*OOO "TerraCloud"* является официальным представителем компании *ТМС* в Узбекистане, \
которая предоставляет полную и актуальную информацию об образовании, а также осуществляет:\n\
  - консультирование по основам правового регулирования в сфере образования;\n\
  - адресную помощь абитуриентам и родителям в выборе направления и подготовки;\n\
  - помощь в построении индивидуального образовательного маршрута;\n\
  - профессионально-ориентированное тестирование.\n\
Наша задача - дать вам максимум информации, чтобы вы смогли сделать выбор своего будущего!\n\
Все ВУЗы, с которыми мы сотрудничаем, прошли государственную аккредитацию и лицензирование, \
кроме того они выдают дипломы государственного образца, которые котируются по всему миру.', about);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'about'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }

      //Дистанционное образование с Россией
      if (mText == '🇷🇺 Россия' && results[0].position == 'remote_education_country'){ //перечислить вузы
        bot.sendMessage(chatId, 'Все ВУЗы в России с которыми мы сотрудничаем, на данный момент:\n\
- *НОЧУ ВО МЭИ и МИП* - Негосударственное Образовательное Частное Учреждение Московский\
 Экономический Институт и Московский Институт Психоанализа', remote_education_ru);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'remote_education_ru'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }
      //Дистанционное образование с Казахстаном
      else if (mText == '🇰🇿 Казахстан' && results[0].position == 'remote_education_country'){
        bot.sendMessage(chatId, 'Все ВУЗы в Казахстане с которыми мы сотрудничаем, на данный момент:\n\
- *КИПУДН* - Казахстанский инженерно-педагогический университет Дружбы народов', remote_education_kz);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'remote_education_kz'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }
      else if (mText == 'На главную' && results[0].position == 'remote_education_country'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }

      //Очное образование в России
      /* if (mText == '🇷🇺 Россия' && results[0].position == 'admission_to_the_university_country'){
        bot.sendMessage(chatId, 'Все ВУЗы в России с которыми мы сотрудничаем, на данный момент:', admission_to_the_university_ru);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: "admission_to_the_university_ru"}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      } */
      //Очное образование в Казахстане
      /* else */ if (mText == '🇰🇿 Казахстан' && results[0].position == 'admission_to_the_university_country'){
        bot.sendMessage(chatId, 'Все ВУЗы в Казахстане с которыми мы сотрудничаем, на данный момент:\n\
- *КИПУДН* - Казахстанский инженерно-педагогический университет Дружбы народов', admission_to_the_university_kz);
        users.findOneAndUpdate(
                { chatId: chatId}, // критерий выборки
                { $set: {position: 'admission_to_the_university_kz'}}, // параметр обновления
                function(err, result){
                  if (err){
                    bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
                  }
                  // console.log(result);
                  // client.close();
                }
        );
        // client.close();
      }
      else if (mText == 'На главную' && results[0].position == 'admission_to_the_university_country'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }

      //Дистанционное образование в России ВУЗы mText == 'НОЧУ ВО МЭИ и МИП' && 
      if (mText == 'НОЧУ ВО МЭИ и МИП' && results[0].position == 'remote_education_ru'){
        // bot.sendMessage(chatId, JSON.stringify(msg));
        bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "AgADAgADZqkxG3MDqEnq7vrwnwaTe7a_rA4ABM8sD94s4j8fcP0CAAEC"
          },
          {
            type: "photo",
            media: "AgADAgADZakxG3MDqEkBmfOF5QnctXq4tw4ABKrijU-3VJUnpH8AAgI"
          }
        ]);
      }
      else if (mText == 'Назад' && results[0].position == 'remote_education_ru'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну', remote_education_country);
        users.findOneAndUpdate(
          { chatId: chatId}, // критерий выборки
          { $set: {position: 'remote_education_country'}}, // параметр обновления
          function(err, result){
            if (err){
              bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
            }
            // console.log(result);
            // client.close();
          }
        );
      }
      else if (mText == 'На главную' && results[0].position == 'remote_education_ru'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }

      //Дистанционное образование с Казахстаном mText == 'КИПУДН' && 
      if (mText == 'КИПУДН' && results[0].position == 'remote_education_kz'){
        // bot.sendMessage(chatId, JSON.stringify(msg));
        bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "AgADAgADc6kxG-qwqUm_OWeHOULnvblVqw4ABGOqpTZxgZRgKPkCAAEC"
          },
          {
            type: "photo",
            media: "AgADAgADZ6kxG3MDqEncqgmOY9wIMW0mrQ4ABLNZ2cD6s_24gAEDAAEC"
          }
        ]);
      }
      else if (mText == 'Назад' && results[0].position == 'remote_education_kz'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну', remote_education_country);
        users.findOneAndUpdate(
          { chatId: chatId}, // критерий выборки
          { $set: {position: 'remote_education_country'}}, // параметр обновления
          function(err, result){
            if (err){
              bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
            }
            // console.log(result);
            // client.close();
          }
        );
      }
      else if (mText == 'На главную' && results[0].position == 'remote_education_kz'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }

      //написать о поступлении в ВУЗы например Россия (Гупкина, НОЧУ ВО МЭИ, НОЧУ ВО МИП) и Казахстан (смотреть в Асане)

      //Очное образование в России ВУЗы
      /* if (mText == 'НОУ ВО МЭИ' && results[0].position == 'admission_to_the_university_ru'){
        bot.sendMessage(chatId, '\
*Негосударственное образовательное частное учреждение московский экономический институт* — \
это современный учебно-научный и производственный комплекс со своими собственными площадями, \
на базе которых созданы все условия для подготовки специалистов высокой квалификации в различных областях.\n\
\n\
В Московском экономическом институте представлены разные уровни образования от колледжа до аспирантуры. \
В институте можно получить самые современные и востребованные на рынке труда профессии: \
юриста, экономиста, психолога, дизайнера и др.\n\
\n\
*Факультеты:*\n\
  - Управление персоналом\n\
  - Юриспруденция\n\
  - Государственное и муниципальное управление\n\
  - Менеджмент\n\
  - Дизайн\n\
  - Бизнес-информатика\n\
\n\
Стоимость:\n\
*Бакалавриат* от 60 000 руб (~ 942$ или ~ 7 400 000 сум) за семестр или 120 000 рублей в год (~ 1 884$ или ~ 14 810 000 сум)\n\
*Магистратура* от 150 000 рублей в год (~ 2 355$ или ~ 18 510 000 сум)', default_options);
  }
  else if (mText == 'НОУ ВО МИП' && results[0].position == 'admission_to_the_university_ru'){
    bot.sendMessage(chatId, '\
*Негосударственное образовательное частное учреждение московский институт психоанализа* \
(до 2011 года «Институт психоанализа») — \
негосударственное образовательное частное учреждение высшего образования, осуществляющее \
образовательную деятельность на основании лицензии и свидетельства о государственной аккредитации. \n\
\n\
Институт реализует программы высшего, дополнительного и послевузовского (аспирантура) профессионального \
образования в области психологии, клинической психологии, психоанализа, психолого-педагогического и \
специального (дефектологического) направлений.\n\
\n\
*Факультеты:*\n\
  - Психология\n\
  - Психолого-педагогическое образование\n\
  - Специальное (дефектологическое) образование\n\
  - Клиническая психология\n\
\n\
Стоимость:\n\
*Бакалавриат* от 25 000 руб (~ 393$ или ~ 3 100 000 сум) за семестр или 50 000 рублей в год (~ 786$ или ~ 6 200 000 сум)\n\
*Магистратура* от 80 000 рублей в год (~ 1290$ или ~ 1 000 000 сум)', default_options);
      }
      else if (mText == 'Назад' && results[0].position == 'admission_to_the_university_ru'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну', remote_education_country);
        users.findOneAndUpdate(
          { chatId: chatId}, // критерий выборки
          { $set: {position: "admission_to_the_university_country"}}, // параметр обновления
          function(err, result){
            if (err){
              bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
            }
            // console.log(result);
            // client.close();
          }
        );
      }
      else if (mText == 'На главную' && results[0].position == 'admission_to_the_university_ru'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      } */

      //Очное образование в Казахстане mText == 'КИПУДН' && 
      if (mText == 'КИПУДН' && results[0].position == 'admission_to_the_university_kz'){
        // bot.sendMessage(chatId, JSON.stringify(msg));
        bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "AgADAgADc6kxG-qwqUm_OWeHOULnvblVqw4ABGOqpTZxgZRgKPkCAAEC"
          },
          {
            type: "photo",
            media: "AgADAgADZ6kxG3MDqEncqgmOY9wIMW0mrQ4ABLNZ2cD6s_24gAEDAAEC"
          }
        ]);
      }
      else if (mText == 'Назад' && results[0].position == 'admission_to_the_university_kz'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну:', remote_education_country);
        users.findOneAndUpdate(
          { chatId: chatId}, // критерий выборки
          { $set: {position: 'admission_to_the_university_country'}}, // параметр обновления
          function(err, result){
            if (err){
              bot.sendMessage(artemId, 'При перезаписи позиции произошла ошибка');
            }
            // console.log(result);
            // client.close();
          }
        );
      }
      else if (mText == 'На главную' && results[0].position == 'admission_to_the_university_kz'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }

      //О нас
      if (mText == 'Контакты' && results[0].position == 'about'){
        bot.sendMessage(chatId, '+998 90 315 58 85 Улугбек Исломович\n\
+998 97 771 66 83 Бекзод Бахтиярович');
      }
      else if (mText == 'На главную' && results[0].position == 'about'){
        bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
      }
    });
  });

mongoClient.connect("mongodb://localhost:27017/base", function(err, client){
  if(err){
    return console.log(err);
    bot.sendMessage(artemId, 'Ошибка при подключении к БД');
  }
  // взаимодействие с базой данных
  const db = client.db("base");
  users = db.collection("users");
  // console.log("Подключился");

    
  //Отправка сообщений всем авторизованным пользователям
  /* users.find({}).toArray(function(err, results){
    if (err) {
      bot.sendMessage(artemId, 'Произошла ошибка в ходе поиска, возможно не найдены элементы');
    }
    else {
      var i;
      for (i = 0; i < results.length; i++) {
        bot.sendMessage(results[i].chatId, 'Отправка сообщений всем авторизованным пользователям.');
      }
    }
  }); */
});