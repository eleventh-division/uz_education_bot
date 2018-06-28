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
                { $set: {position: "remote_education_country"}}, // параметр обновления
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
                { $set: {position: "admission_to_the_university_country"}}, // параметр обновления
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
                { $set: {position: "about"}}, // параметр обновления
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
                { $set: {position: "remote_education_ru"}}, // параметр обновления
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
                { $set: {position: "remote_education_kz"}}, // параметр обновления
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
                { $set: {position: "admission_to_the_university_kz"}}, // параметр обновления
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
        // bot.sendPhoto(chatId, "mei_mip_1.png");
        /* bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "mei_mip_1.png"
          },
          {
            type: "photo",
            media: "mei_mip_2.png"
          }
        ]); */
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
          { $set: {position: "remote_education_country"}}, // параметр обновления
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
        bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHQAugMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAFBgMEBwIBAAj/xABAEAABAwMCAwQIBAMHBAMAAAABAgMEAAURBiESMUETUWFxBxQiMoGRobFCUsHRFSNiM0NyguHw8RYkU5JEZNL/xAAbAQADAQEBAQEAAAAAAAAAAAADBAUCBgEAB//EADURAAEDAgUCBAQFBAMBAAAAAAEAAgMEEQUSITFBE1EiYXGRFDKBsSNCodHwBhXB4SQzUkP/2gAMAwEAAhEDEQA/AFCEcCpb0JF2HRjnQSFsFcyV+ycV5ey8KV7lMUhZFMRjMsAKkm4nODWzDdayrQtExkMaflX9sD1tvIZKhkJA57dc1AxGTNUNpj8p3VfD6Ztg93KZ9OXx662VdynspbSlSgOH8QHM4+dSqyjbBMIozdVTGA4NYpE3BMtAdZYS5GUeFKuRz1yDXxg6ehNnLTo3sdYqjcbdapTau1iJCuuBwn6USGeeM6OWgXJal2DCCmG+lxrrHlDiT8DzFVIq0Xu8WPcLLwHCxSRqCK9DkpaVHeYRjCUOL40g/wBKu6rlLI2Rt7gqRUxuY61tE66ItzPZfzApLS+FSmXUgpQsfjSe6omJzuvYb9/Lsj08YsnxbKslQThR2C0bjFQS8Eqi0gCy9bQDFwweJGcKPXxrJJD/ABLwnXVD5ctmIhIh2wSnWz7DalcCc96jg03FE6TV77BfGOVws0qldNeTLUGmnhCQ+oFTjTaSezHTmefypmLB4pSXAG3nyp8rYY3ZXOuUm3H0n36TlAbtwwfeEbJPzNWIsFpWd/dINqJGHwFDL9q+4X+CxDlNtNNtKK1FoEdoemc8sUxTYfDSvc9l7nvwszVUkos5AhTl0sol71sLy684cCtWWbr1DxSdq8sthW0JLgBVWCVoKTgry69RuMcJpd4S6soewedYsvkVtMc3CQiODgr6noKUq39GMvRYYurIGLm+ej6RNSqRZ5zLx6tOjgOfOlqXGY4/DM0hPS4ZJGdCs6uUCXapKo8+O4y8j8Kxz8QeorooZI5m54zcJJ7HMNnCy2TT7CY2kVwdjmO05/7D981x1Y/PWCTzI9l0tOwCKIjspdPADR3q42U20tJ+tDrD/wAzN6Jhg/EBUWjF9pp+Y2dyzJCh8QP9a3iItUNPcItW20zT3CJyUKblJbSnKlpCm0k44x1x4jupaOzmZuyEHC11FIhJeAUuOCO8jH1r1kpabAr3wlC37VFuzD0Vp4j2TsSF4+dOMqHwEPIQJI2uFgVWtEK22JKoqJRefb2cC5AO/wDhA28qNUyy1Piy2B20SzIxGFZi61hOylx2mpgcbUU+y3xpP12HnigvwmQMDyRr9FptQxxy2KvWjV0GVLcKI7mEpytWAnB79yBjvNAnwuRrQC5GMZc0m9rLzV99cftq0W6a0wlSN3WSCpQ7groD4fOtYdSdOS8jbnz/AGSskIMRdnssqRE7RO+xO9dbmUEOVKTFLSznlWg5aDrqLAAr7dfLpptTh9kZr5eHRWEwCBle3hWgUIlQPoCdhRAV8FAuO6hCXS2sNq2SsjY+R+B+VeXB0RQDa5GibdOafVcLM/OJIweBod5HOkZ6gRyBiZgjDmFx+irLtUhKing5HFa6zVvoleRXQvCc860Qp7hZXSyoDOK+uAhm6O6RWhN6iBw7FRHmcVNxXWmdlTNG78cK7qCZL01ekyWiVRHjng6HvHnU2kijrIcp+YLs2uE0YDuFauMK160gJVjO2AtPvtmhQzT4dJ/LFI1NKHjK5SSmHba9DjY4kuweyJH5m9x9M14x7Z2uf2df3RqZv4GXlq8se8GaynoF4+4+9eVX/Yx3oiNNnAoToCQotXSP3rbP1I/SmsVZ/wBbvVGqtS1ydLpCRMet6Tkdi92mR4A1Gp5jG1/mLJGN2UOK5vJX6u4lokcKcDG2VEfoK9pbZgSvYmZ9O6W9K6XcjTEznHRFZQD/AC2tkkd2/PzNVK3EWvZ0wMxK9e2KAZYxcpS1jdWVT1xLSotw2VEEtnh7RZ5kkc6r4fC4Rh8urj34UOtrHOflYdB25K505e7XaojypzUhyQVk8LSRlY2wConatVdJNO4ZCAP5st01cyGMgi7kMkXqde56o8RpuM1JUEJZZSE4HQE8z4+VMtp4qePM43I5KA+snm8F902wdFonJdjpc9XkpB7JefYXj8w5jzFSZcVEZDiLt/VP1OGNEeZqn07pY295a782njcUW22uIEBI5q/bwrNXiQkaPhztr/pDoaBxzOeEn6ntcq13Z2HJAO3G2oHZbZJ4Vf765qtS1DJ4RI3+FTpIzG4tKP6M9HxuqUTr0pbUNXtIZQeFbo7yfwp+p8KQxDGRTfhwi7v0H+0eGmLxmdsp/SO5Atki22u0x2WWmGlOKbaTzKyAM9SfZPPvrzBjNMx80ziSTb2Q6wBhDAEBulufgWMT56S29IcDcdnOCkcypQ78DYeOTVGKpZLN02agbleGlMcWd+52CA2+FIuC3UspClNtF1QzvwggHHzFMSytjAJ9EOOMvvl4F0+MWZErQJd4QS3HWQMclpcKgR8FK+dRXVhZX5TyR7EKlHlkoMttRdFtBPNu2ZMFsELj7r8eIk5pXE3uZLn4P+EOis8FvZXTb0AkKQnPXCKXFSe6f6CyW0OFUhIztmuvLRZc6/ZPEZyWlgP28pUtr3mlAHIqLVNZnyybHlWMNkjczK4LpnU9rlupTcoCY8ltQIeaHCQR1Ipd1DOwXifcHgqi6khecw3TZPRb9QWsRlupWFo4m3U78JqRCZqWXNb6IrM0bkgWidJ0xelNvAlsHDifzJ6EVfnhZWwXbuqGVszMqfNUH+I6cFwt6gpyKQ+2U9R1HyzUGhHRqejJs7RT2XikLHcoZZJjSboyEn+RcWO0aPj3f77qaqonGI92HVfF4vohejT6trC8W1QwQFKT/lWCPoqm8QGeijl9P1C+knDnZQtEaWC6VnonauaI0QnCzbKvc+witB+4vJZYb3JUccRO+B30aBr5DljFystnawacpcnXN28Q18AehW8ZGVJKFuD7gVTip20z+HP+yw1jpweB+p/0lSLAsEy5RYsaU4XXHkpTw5IJz4iqzpaqONz3N0sgvwyFozBON4tNkukxUW6RAhSvZbkNeytHhnr5GpEFXVRMD43X7gpibDmzRZ2jVLdr0jI0xq5kyOGTDW04YshKeasciOh4eL9KpT4iysonZNHaXH881KpoDHUC6OzZ642pYrEdIK1ug8XThVv9qnRQCSnc53ZdS0NdTG671TKUZ8YjIAQtR+YrFCwdN30XlFHYKze7Wzf4FqnKCT6vhLuRupHPH/sB8CazS1JpXyRd9vVR6mkBnse6sGeWktxUnClkJSe6giEvJeU+yJurzsEKsmnxMuUrUl3RjtVn1RpfNtsbJV4EgDyp6rrunG2kh439VJp4y+UyuGp2S16T5Yeulvht/wBk22VEd5JA/T61RwWPLC953JQsRJ6jWldafgpgXyQEIy0phYTnwWnI+leVc3UhB5BH2W4ohFU6bEJrtaWo1olW/wDAp1xLY/pUAR96lTlzp2S+n6I0EVmvZ6qn6OIakMXF4n3lNIHgQST9xRMYk+Rvqk8P0LinYxkEklIyag9QqlmKwK02qdIldlBjOPOc8JHIeJ6V+hy1Ecbcz3WXOhjpDZounCDb7xDdQpUNYI95PEnf61MqJ4J22BTUFJVROzBqJztJfxdvtFs9i8Rs4CAfjU6LETAbXuFcaSN0vmy6l0s96w0wp+MDklv2gR4jpVEVNFXNyk2KM2XjdH3I0LWNtEmEsIktpwQeaVdxpBskuHS5X/KjRzBuhS9pPUb9hu7lnvCVNsLV2akr34FHr5GqWIULKuEVEG41U51Uep05PoVNNdas8abDU+A5a5iZduX0W2dy3n5/OsRtNQ5kltHjK717oDpS27Txso42oLYNeIvjS1pgux+F4lG4Vju6jYVp1FN/b/hj8wOnohfENMwcDotBsd6hXaIh6I6la1sFRSDunBxuOlc5VUckDy1w0BT7JWyWsV68qPDLd7vKA/MOUwmFf3aeWQO89T8K0zqOvTwaN/Me6+bSfEy5WbDlB5DU5+a24/d0Q23FApZLO4HdmnGuhYwhrMxHN0/oLhrb2VmbZmYl+hXZu3F3LzYW6xjCcnBcKc925I7qxFVOlgdCX20O/wBlNkmysLQFHrRlTWX2iQSrAI6K6Gs4c4O8JVWgfmZkKtaQvLV7gKhyiO2TsAeaSO77/MUPEKY0z+o3YpasgyHqtQi7xHIuq7U+rkXCyvfrg8NO0sgkpJGeV1psv4VhsutYHs0R3RtlKkfUGsYeMxcPNOUZ+YIxoV71zTriVnPCtST8qSxNvTqQQksQGWYOS3a5Dtx1+lhJyxHSorT02H74qnMwQYfm5K1K4MjI7pyvT5w3HRtkFSh3AVFpmbuKFSsABeVmlzaFzkcIBWXipbBxkocHvJ8jXUQvMLNeN/RT6pgkJCPdgphSnFDC0+0sflChjf40gXh2nCIGHKHHhexHit4dTkffFYe2zV611nJl07FTbojyTsp6StYHh0qdWydZzT2CFDF083mSp1XZoE+3QBSu7IqE6LtT8OI47LS23HfAPZrGFHuPhT+KVLJHhse49lPw+OaMX7+6nu2mrfcApTDi2XOfE2rP0rFPiM8PzahXGyuHzBJz1k1VZJIXbJS32c78J5eaT+lV21VDUi0rbH+dlu4JVpWuL1ASE3KF2iBso9mpH6Vn+zUsusUlivpIo2DNb2VFV0tFyki4WGd/CrzzLbow0/8A0npRhTVELenUNzx9xuP8qdJKxzvA6xVDUlxa1G3CTMhIZuTa+Ba0ObKHdnzo1HAaQv6brsKVmd1crXDVXLRpJ+e2puUFKKFjjQhWAUHnnuNBnxFsOrOUw2jb/wDUo4nQFtajobLWUh0qUeI54egzSP8Ae5i69+Eb4Wn2DVStGnZWmL/DU04VxZGW3ydsA8RSB38hvTE9dHW0zg4eIahLMpzDKHMOico0Zv11V2vA45B2iw//ABI6E+J5+FRZHEM6EO3J7nyVEyPLOjDoOT3Q/WsN252v11v+2bUVLQjngdR4imcNlbFL0zsVunPSPTOyWbFq2TbHEMSV9tHO/wAO8ftVKqw5kwJaLFPS07Jddinm4xmrzY1yYKg4hxBO3X/WoUT3U8+WThTYpHQS5XLJrddHrPekuj2VIVhY7/Guslp2zw5eCqT5GvOR3K0fXTqH9Ps3iKAohTb6SO9KgftkVzuFNLKkwO8x7qVG0szxHcIXrVaJGnY81g8TZUFpI7lDb7imMNaWVLoyn6WTUnyVj0ayOz0xdHFH3HDj4pFDxiPNVRj+boNd4pWBD/RYj1i43i4K5kpQk+JJUfsKaxw5Io40Cd+Z1kzSGn7hdZhjkJ7MIZSpXIZwVH5fepTHMhhbm51/ZFJEdO0HnVTM29m0xSxaI3HJXklw8yr8xPSsuqHVD80ztEvGwXu82CrQrMuGiQq5SGyl8YKRzz599blqhIW9IbJiSVsoDIwgzrDMB9B7cKCsniAxg041zpW7JSSLpWvyuF3d5Ep2QpXFwtJDYB2G+5+NbFO0sDPMoebUoa8+FOrPaEZUdqYDLCyyme8W2VdInrNumB5txOUgqwfKpkEzIH5JW2IVWlrIclrWWeSo+o7NJLrQlMnPvIyQf0roY5KOobY2K+lBd8qJ2/XF/QnhlW9Enh/F2akn442pabCaR3yut9UBrJDoV3cPSNdEDhXaYiUdQviJryHBIDtIUOZksIzWul2bfbPfOND9kbZmKHsOtL4QD41Ripaim1bLdvYqfJURS6ObqjGi7X61MbfUkOoJKC2CMpH5vEeIpPEZ+nGW7co1JGLdUrWo0ZtOG0DCUgAq6nzNchJITqUdzuSvpZShO2P2ryO5K1HcqtKQ2pDXG+hCgscC1EA8XTHjTETnNcbC6952Squ/u2i6Ow5lvyjdXaD3j4786q/BioiEjHpxtOHtGQo9abrBuKVJiPoKlbls7KHwqfPTyw2LhshSwvZqQkrWelXoilzbehS46jxLbSN2j3gd1W8OxBsgEch1+6YinD25SdVDoHVps8oxJy/+yfOCTybPf5d9ExPDhUMzsHiCFUx9doP5grXpL04lLartAQNvaWlHUd/w+1BwatN+hIgZi6PzC79HlzRqDT87T8lWXUIKmt9yk8/kfvX2K05pahlS3a+qF8QJSJOeVVtbrkz0e3KI8P8AuLaHGlj8vD7Q+m3wo07BHiEcjdn2WaaX8Nw5C60LNxonUCs7NHtD5cH+lZxOH/mwjvovevmeHngK96HlFNhnvKTzkjfvwkfvS/8AUIHWYPJCiJk1Kc4TfYs8A99aitw95JzUOZ2Z1+AnJDc3OwX12use0Qy8+QNtkjmo+FfU9M+oflasxwulckuPcJt7uSEnJcdVhtscmxVt8EdNH5BV2xsp4y5VNeOJj3BEGOrIjMBCyD+M7n9KNhjc0XUd+Y/oucqJTK4uKX4VwcdQWnOYAAPhT8sIGoQGPJ0KJLcSpRO+5zS1ka6I2y9vR1pbhKKio4DQ34j5U3X0tPK27uOVDgnmiPg9k+FbMWGl+7qbZWRlTZVsk91cdZz5MsOoXSQGWUCw1Sxc9d2mMooYacex1QkAVTgwioeLuNk6IS0XcUDc1/HcWeCyqe+RP2p9uDPA1lssPma0W1Q6/XtF6glpGn58Z4EKQ41GBGfE4zim6WldTvuZQR5lTJpWyAtDCFf9G9zDUlMKc32bzWexKmiDg896WxinuwyR6g76olJJePpvGy0hMhxHEnsyN/ezXMGMFNGNptqq0O62+Rdf4eJCXZPDxFA3A8M0aSmmZF1LWC9kY9rC4DQIdqG1QZ1yEmfMn9ikDs4zQCQk9Tk05R1EsUOSNov3W6XqgHLb6rq4TdP3UIauDikLTslxXsK+dZiiq4CXMF/JEZDUw6sVFzRVtcHrNpuMllzmlaVpWkfLB+tGGKSN8M0ei++LmBs8KwzcLpY+FnUKA9DOyJzI4kp/x/l+NYdTw1PjpjZ3/n9kN7oZNW6FL+sNItym1XGxBKlKHGWWyClwd6PHwqhh+JFp6VR7/uvHOcW6bhQaA1QmYBp287lWUR1OfHKDn6fKiYrQFn/Kh43t90pHUgu13QBLL+iNesqQlaowVnb8TKtiPMb/ACFUAWYlQkHc/cJKUGGbTZd/9VNQ7zqJ2CyFRrkCOye24Vcidj/i+YrQw8yRQtkPiZyh/EBr3FvKoWm7qtNouVuYCXmrg32TilA5RsRkEefWmJKQTyMldoWHRCE1mkd016F1Fb7VYZ1veWhpTSVyW1rWB2qjtwY7/ZHzqVimHSzzslGvB8h3TNNUBt1oUKQ28x6ylQ7NQCgrP4cZz9a5eaJzH5Duql81rcoCzZXdVXEXCeVN2xvaO2NlOj83gD9aoOqmUEXSZq87+SZdUimbkZvym6OzabKwClqPHx3JHEf1NRnvqKl25KnE1FS62pS1qlrTtxiuyXk+rrTv6wgBJUf1qnQurInBg1HZafTOjH4psswSWm1koORnaumIcRqlPDwvDMOeZr7pLzMnf0c23sLYu79j20t1ZajAjPABzV552+FR8YqM0ggvYDU/shYZTsec7zYIw/pOVdXy9d5SwknPZpNItxJkDcsIXROrooxliCla03p+HIbjpiNOyFbpChxq8z3CsurquRpdmsPZJuq3uOpVbU16t+nU9jGitrlYzwJSEhPiTRaKlmqzme7RMQRvkGY7JXhDVGrFlSZSocLPtONjhA8Bjcn41VkNFQjVuZy9mbkFtlDdUWexviJDbcu13J4S5IdKwgn6Z8BRIHVFS3O85GeSVEAv4RcrRrDYXYtkEeU8pyS8glxXEcJKuiQTsByrm6uta+ozMFmjb6d0ASZHb3STp+zvWjUTJezxtPcCs92cVaqqhtRTm2xCvyZJKYlvITNcNTWZeqnNOzynPCkJkFWAl078BPTbHx2qfFh1QKQVUe/by7rm46wxvAaUF1Ro+QpKlwF9qOqDsoUzRYkz5X6K7FWtkFn6FIrM+62OZhK3mHE80KP6dauuhgqWbAhae7hwuE62f0jMvpEe8shBUMF1Iyk+YqNPgrmnPAUm+CMnwm3kpJUKXb2zc9ILQ/DV7TlvKstr7y3+U+H/ABXsc0cx6NaLO4d+6WkbJH4m+yUtSGz3+3uXy2O+o3JhSRIjKGFKOQM7dQfxfPFV6MVFNJ8PKMzDsUlOY5mmRpsRuqEdu6avnuuetcT6WwntXAcK8Bjzz30050FFEBlsPJLsZJUusCny06OiLZiyJEZhMhop41lsDiKcb9x5d1RKnFntc5jDcFPMp4mhuYahWf8Ao+3NQ5DXqrZbkYDhTz4UkkEeO/PnsKB/dZnPab7ftZEFPAQW23SdqrTiLcxFftqVLUhLMdKEAKLxJVxLV8SBVmhrnSlzZObn0GmiSqqXptGX0Tjpiem6aftkItpZdkOONutJO6G2jhefPCR/nqLiEHRqZJdwACL9zt/PJNU01mAndEtQawYtrnqMAByV7p4eSPCkKXDHzDqybKjS4f1Tmk2VBLfYQv41qiSWmVH+WyT7TijyA/aj3zv6FKLnk9kSqrY4B04fdZ/qe/qu8jjSgMsI2aZSdkj9TV+joxTtte55K56omdIbuKAiUR1p4xpfqledue+vsiz1CtM07rRWn4KITlv7Vtv3VIc4SfMEVDrME+Kkzh9l8yrAaGFuyr3P0mXSY+mLaLc0w68sIQta+0USTgbYA+9fQ/0/TxDPM4m30RDVuIswJ1t8EWC2PS5L6pNxWnLrqvxLP2A7qhTzfFyiNoswbeip0kLnuEZ53KX7fpw3WWqbclHsePi35rNPS13RZ0491cqalkLcjN/sj817ht7iIAS0w02TxjkPLvNIRMvKDJuVNiIe8Em5KRNC2kytRodfHEGj2ilH8SqvYnU5KYgc6KjU2hhNkxa41VcNN3uE7CCHI6mlB1lzks5GN+h/ep+F0ENXTvbJvfQqOIczLoxZpberbY3d2oqYskKKSjj4gcHqcClKiM4fN0S67SiNkdTAMJu0rNrdoS96mvU95aRFjGU6HJL4yFHjOeEc1b/Dxrp58WpqKFgJubCwHpz2XPiJznFa3BtAtVqahLuEiWWhgPSSCoju2H3zXHz1fxEpkawNvwFUp3ObpuhtzttpuCC3ODR8ScYo8E9REbxqmySVuwulG6+juFKQVWm4BJ6IJ4x981YgxqVhtMxZe4SCxFksC0ax0q+p6Ah5SBzLBDqFeaP9Kqiow+ublfa/nofdIStnj1bqP5whd0mPX24okphIYce4TIbaSeHI2Kz1HjT1PE2njyZrgbE/ZT5XdRw0WqaVskaAwl9LYbDe2UjAdGNs42P+z1rmMRq3Skx7/wCFUZHkADRYlM6Wy6S47sPe4OgP/FRi/L4QvSbaLlYQGuNOOBSRgpGcj4VoF17HdfN1KFOhorC1LGEYBWANsk4Ph1p5rnZTZGdeyT9DW2U7MvjdqSuPIU8ppMt/2uxb4iScdVHAx8/Ovi08bY4zNqN8o5Nv0AU6Dwucbco2m26a0OyZd7nesTSCpIX7y/JP61L69ZibskDbNT0uIPDLA2H6rM9V6kmajuRlSVBLSdmGUnKW0/qe8101DRR0keRm/J7qHJPncganFHmabyrBddeA7717ZZXeayvk6TW0qJA51kFBcLIhoK1JVqduS+jKIzS3viMAfepWNTFlKWj8xATVGA+UJ5muoiQvW7s6A28suhrPtKPIACubhjdNJ04BqNLroJ6yKn+XgWSXdtUTZayhCuxjDZDLewA8+tdNS4VFELkXd3XNT1ksxOuhTja3m5ug+1RjdpQXjvBwftXOVbDFiNjtfRWsLfcxrjTLMe2w5twfKUIQACo7Y5ms1hfO9sbdyqmKTgWaTpulPXZ/i1s9db9rgWHBj8p2/aq+GfgSmM/woUbmuaAEyejd5FssLjUg4IVnh8eoqdjETp6gFq1WwOcWNbuiM69z5OUQkFCeQS2Mn51iKhp2DNKblahoYY9ZDdVBpmdP/nXqe602f7pC9/ielefHwxeGBlyiPxCJngp2/VfLiaRtQIWmGVDmt9faK+ua+E2ITnw3Hpog3q5NyUJnS9EP5DqYQJ/G20Un5p3pyJmKN2v9dfuvDC/833QWSuKwoL05rMR//rS3eJB8AVAkU/GHvFqmmv5hIytLT4ZEqR3savbelrLii8olbDoAKjncKHT79x5VYIvTZGaacpEG0+Zy2hk9mx2RSezV7XEoe551xbxmdm5VgjMbjdX0SGi2RxAgjelDG7MgFhUD7n8rso6AEIHDwge7jpjuxRmtu7M867rbWW3Q6VKbjN5eejxyU54nlYwR18O6m2xl58IJ9FomyE2S+mI16rbUdtlanX5Ktg6tRyTvyHQeGKLWUvVfnk04A7BMxUDGx3lOqoah1Taxe+GW0hbiW0guoAXw+FHpMPn6HgNh2QmthabXurtul2m4YUz6s8e5SQfoaBNHUQ73COYmkcKWXoGw35pz1Zr+HzcZC2Nkk+KTt8qzFjVTTEB/ib57+6k1VGwagLLdUacuOmpvq9xa9lWeyeQMocHge/wrqaOshrGZ4j9OQpL4yw6oHxmm8qHdO8hxQc60NoWXopa7y5b19oykFZQpJzyOR/xQKukZUsyO9V9BMYX5whd1nSZ0ovynluOHqo8h3DuHhX0NPHA3KwWQ3udI7M4qVhpLjW+M0wFnKUS0/fDZ+3gupLsKRs4gHdBxjKf2qTiGHie0jdHN2TlJVGndrsudX3GTJjJgwVkQk+2rG3aK8fKsUFGIz1XjxfZMYpV/ES2afCp/Ru/GmNO2e8OISOFSGC5sFA8k+YztS+MRSRkVEI9VujrcgDTwmy3KVZo8zjjofklSW2WXNg46Tgb9B1J7qkyj4l7fFZu5PkrOJTZmMczcozcb6iK32cVtBdA9op9xJ8O+kYaJ0hu46IdNQukN5Doka6PX+8rKWu3Wn8jYIT9KtwNpYBrZW2R09OOAhregL3L9p3sms9XF70wcYpo9BqgzVkJ0urbPovX/APLuKAOobRn6mhOx9v5GJF00btgoZuidJ2lJVc7q/n8vbJTnyAGaLFitfPpFGlXwMcLnQJQvcayTH2omlmpjrm4WFJWvj8hz+lWKZ9SxpfVED9EhLHGdI73ThpPVMWIx/CJnFFlR9uKU9niPcCcn4VLraFz3dduoPYJqKVujHGxHdNyZsFzKUXGKniGE4eRse7OT5YqS6OQfkP8APomBINOVSmXmLbEpVImskblTYdTxKQNh7I35jFFZSvm+Vv18/svZJI1ZRPtc+wfxd60l5hkKUjJQsjfcgZ2PnS7oZ4qj4cSWJ9QgGQhudLb91gX9kxnI6Yzedmknhz8RVFtNLSuzg3Pdbp6yKoGVx180vTtFlOVW54nH92vnT0eKcShMmnZ+XRBXLbc4LgUY76FDkpKT9xTonhlG4Xoa9iP6e1feLZJb7RK5CEndKwc48KQq8NgnYbaLeXqjK4LS7g/bdZadfhvtKQp5vLfaJwUL6EdxBrnIGTYdVB4OgOvokajD3M03C/PrlsmNOLbdYeS4glKh2Z2I5137Zo3C4cFz5DwbZVoy4IXzFehqXfKq0lhLSdq8KG0koHNd4ScUIo7AoGropoEZrQCLZdMXALcysjnXtlhzUyQpkd5ASsg17YIJBC9egsqytoDegSsuNF5dTRbrMhKQlxZeQ3ugOKJ4Ty5+WfnUmalY4kWtdOQV0kVgfEBtdMdo1bZnDiZBWHRzVstP+/hU6owyot+G7T2VE4sXDxXHoi7+t7FHTgF0eCGTU8YPVOOtvdD+NiOpJKs2jUDV2ZelNx3o8FrYvyMJCj/SATt47UKooOhZpddx4CYgkMx8LUk6o1tIkvKi2XKG88JexlSz/T3VaosKZG0Pm37K7DRZRd+6rWjQr09BuOpH3W2ccXAVEuL8yeX3o0+LBh6VMLn9EvUSMvl3KeW7VbrNBUGI7UOOlOXCgcJPmeZNQXVU9TJ4jmP6IMWps0LLL1cH73PMKzRkxmHl4w2jDj3itXM+VdZTsFNHnmdcj2HoEaSjzae6fIOlLTY7C3BmobW9MUEOOK2UtZBOEnmMYOMVAkxKpqagyRnRv2SjGx3yt2QLX1kaTboSYLKGmkKPGUp3ORzJ5n409hda8yO6huU3HSMlGXsoNFvuQYU2CtRVFcbUSlXfjet4i0SyNk/MCmZaNjIbW2SWmSppYOcYqzkBXDXui8DUUqPgJWHEj8K96VmomP8AJNxV88OgNx5pstmvIrKR6zayT+ZpQz9akTYO53yvRTi9/mafdW5XpDsSkntrVLWfFpv/APVCjwWpB0kA9/2W2YqwfLdALhr5C1D+F25McfmdOT8ht9apR4UQLTPzIrsYkcLNHuhC9UzFrUtS28qOT7NMCgjAtr7oP9yn8vZHZc1LSuEc6tkqIGZkPlvFaM0MojW6pfk4UTWE00WQmUccq2AtKFoq4hwk1pZIR22h0YOTQnGyC9G2ZKkJwo7UIm6CpFyG3B40u8L5B3FLYeJScDNejULR2R3StuVqG7tRScISC46f6R+u9I11R8NCX+3qt08XVflOyZtWvqkKTbLens4bHsBCBgKP7VJohlBmk1cdV3mH07Yow8jX7IhpXSUe3IE+4JBfxlIVybHfS9biT5T049vul6ytLzkj2VJOpkah1tAtUI5t7DinFr/8q0pOP8oPzIpn4E0lC+Z/zkewP+Uk5ha25Vr0kyV9giCzkBR4nPHuFLYMwZjIfoqOExXBkcqfo60+lp1dwkIytOyc9KNi9YSOk1ExKbIOm3lCPTBdiudBgMuFJj/zlFJwQo7J/X509/T1PlifI4b6fRSmx+G6IaLkzNTWJ5m4hKg0QlLpHvHxpbEo46OcOj54TkcpiyvPK+n2z+Gx30qIyEH2h5V9FP1nAhOSztlhcfJZdKx0rqGLgWiwVdpZ4xRHDRfORVtWEZpQjVAIKrSHQBzojGrTWqiV5JNHsjtXnHXtltOziQt8cVHQbaL25JCGQEjFYKy06pbkHnWE0EMXus5rS9U8ZCeIbV4TovHbI7H9lIxSpJSrt1xJcUAcGvQvgFVaeXxe9WXBekKZ5RXjirIWU6+i3+XcJ60+96od/iKhY5rGweaew4AyfzunHTcRl2Q4+4jiWgeznpUive5oyjZdRXzPYwNadEnele/XBuYm0tPdnFW2FLCBgr3OxPd4VYwKkiLOsRdyWhYALoh6IrZFEVVw4CZJWU8RPIUt/UE7y7p30Wqpxayw5V/ViA5eFce+CBS1CbQ6Knh2kCOwf+2sjRa2JBJpGXxzm6mznPUG6xPWjintQy1OHJz+ldthrQ2maAiyNFgPJaj6N2kNaWj8Axxe0fMmuXxlxdVm6HUi2UDsk70oPuIvTaErISWNwDz3NWcEYDASe6g1zj1rA8BIzm6Rmrg3SVrKq3/aCi8LJRFaiGjjuoQAWQhri1FW5ooAWwF4TtXy0FFk1uy9X//Z"
          },
          {
            type: "photo",
            media: "data:image/jpeg;base64,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"
          }
        ]);
        // bot.sendMessage(chatId, JSON.stringify(msg));
        /* bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "AgADAgADc6kxG-qwqUm_OWeHOULnvblVqw4ABGOqpTZxgZRgKPkCAAEC"
          },
          {
            type: "photo",
            media: "AgADAgADZ6kxG3MDqEncqgmOY9wIMW0mrQ4ABLNZ2cD6s_24gAEDAAEC"
          }
        ]); */
      }
      else if (mText == 'Назад' && results[0].position == 'remote_education_kz'){
        bot.sendMessage(chatId, 'Выберите пожалуйста страну', remote_education_country);
        users.findOneAndUpdate(
          { chatId: chatId}, // критерий выборки
          { $set: {position: "remote_education_country"}}, // параметр обновления
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
        /* bot.sendMediaGroup(chatId, [
          {
            type: "photo",
            media: "mei_mip_1.png"
          },
          {
            type: "photo",
            media: "mei_mip_2.png"
          }
        ]); */
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