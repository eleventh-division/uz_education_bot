const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '591148627:AAEg2PF4gJmxA5kIQgN9Qqc9uhaVmt6AsGc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const artemId = 7186732;
var dialog, chatId, mText;

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
      /* [
        '🇰🇿 Казахстан'
      ], */
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
      [
        '🇷🇺 Россия'
      ],
      /* [
        '🇰🇿 Казахстан'
      ], */
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
      [
        'НОУ ВО МЭИ'
      ],
      [
        'НОУ ВО МИП'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
};

/* const remote_education_kz = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        'Южно-Казахский ГУ им. М.Ауэзова'
      ],
      [
        'Назад', 'На главную'
      ]
    ]
  })
}; */

const admission_to_the_university_ru = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    resize_keyboard: true,
    keyboard: 
    [
      [
        'НОУ ВО МЭИ'
      ],
      [
        'НОУ ВО МИП'
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

bot.onText(/\/start/, (msg) =>  {
  var chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Здравствуйте, я могу проинформировать Вас о дистанционном образовании для Узбекистана, \
  а также об очном образовании в других странах. Выберите пожалуйста то, что Вас интересует.', start);
});

bot.on('message', (msg, chatId) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Начало диалога
  if (mText === '🌏 Дистанционное образование'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну:', remote_education_country);
    dialog = 'remote_education';
  }
  else if (mText === '📚 Очное образование'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну:', admission_to_the_university_country);
    dialog = 'admission_to_the_university';
  }
  else if (mText === '📜 О нас'){
    bot.sendMessage(chatId, '\
    Компания *OOO "NeftGazInnovatsiya"* является партнером компании *ТМС*, \
    которая предоставляет полную и актуальную информацию об образовании, а также осуществляет:\n\
    - консультирование по основам правового регулирования в сфере образования;\n\
    - адресную помощь абитуриентам и родителям в выборе направления подготовки;\n\
    - помощь в построении индивидуального образовательного маршрута;\n\
    - профессионально-ориентированное тестирование.\n\
    Наша задача - дать вам максимум информации, чтобы вы смогли сделать выбор своего будущего!\n\
    Все ВУЗы, с которыми мы сотрудничаем, прошли государственную аккредитацию и лицензирование, \
    кроме того они выдают дипломы государственного образца, которые котируются по всему миру.', about);
    
    dialog = 'about';
  }
  /* else{
    bot.sendMessage(chatId, 'Пока бот не имеет таких функций 😔, выберите пожалуйста из имеющихся.', start);
  } */
});

bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Дистанционное образование
  if (mText === '🇷🇺 Россия' && dialog === 'remote_education'){
    bot.sendMessage(chatId, 'Все ВУЗы в России с которыми мы сотрудничаем:', remote_education_ru);
    dialog = 'remote_education_ru';
  }
  /* else if (mText === '🇰🇿 Казахстан' && dialog === 'remote_education'){
    bot.sendMessage(chatId, 'Все ВУЗы в Казахстане с которыми мы сотрудничаем:', remote_education_kz);
    dialog = 'remote_education_kz';
  } */
  else if (mText === 'На главную' && dialog === 'remote_education'){
    bot.sendMessage(chatId, 'Выберите пожалуйста то, что Вас интересует.', start);
    dialog = 'on_the_main';
  }
});

bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Очное образование
  if (mText === '🇷🇺 Россия' && dialog === 'admission_to_the_university'){
    bot.sendMessage(chatId, 'Все ВУЗы в России с которыми мы сотрудничаем:', admission_to_the_university_ru);
    dialog = 'admission_to_the_university_ru';
  }
  /* else if (mText === '🇰🇿 Казахстан' && dialog === 'admission_to_the_university'){
    bot.sendMessage(chatId, 'Все ВУЗы в Казахстане с которыми мы сотрудничаем:', admission_to_the_university_kz);
    dialog = 'admission_to_the_university_kz';
  } */
  else if (mText === 'На главную' && dialog === 'admission_to_the_university'){
    bot.sendMessage(chatId, 'Выберите пожалуйста то, что Вас интересует.', start);
    dialog = 'on_the_main';
  }
});

bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Дистанционное образование в России
  if (mText === 'НОУ ВО МЭИ' && dialog === 'remote_education_ru'){
    bot.sendMessage(chatId, '\
*Негосударственное образовательное частное учреждение московский экономический институт* — \
это современный учебно-научный и производственный комплекс со своими собственными площадями, \
на базе которых созданы все условия для подготовки специалистов высокой квалификации в различных областях.\n\
\n\
В Московском экономическом институте представлены разные уровни образования от колледжа до аспирантуры. \
В институте можно получить самые современные и востребованные на рынке труда профессии: \
менеджера, экономиста, психолога, дизайнера и др.\n\
\n\
Факультеты:\n\
- Управление персоналом\n\
- Юриспруденция\n\
- Государственное и муниципальное управление\n\
- Менеджмент\n\
- Дизайн\n\
- Бизнес-информатика\n\
\n\
Стоимость:\n\
*Бакалавриат* от 40 000 рублей в год\n\
*Магистратура* от 80 000 рублей в год', default_options);
  }
  else if (mText === 'НОУ ВО МИП' && dialog === 'remote_education_ru'){
    bot.sendMessage(chatId, '');
  }
  else if (mText === 'Назад' && dialog === 'remote_education_ru'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну', remote_education_country);
    dialog = 'remote_education';
  }
  else if (mText === 'На главную' && dialog === 'remote_education_ru'){
    bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
  }
});

/* bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Очное образование в Казахстане
  if (mText === 'Южно-Казахский ГУ им. М.Ауэзова' && dialog === 'remote_education_kz'){
    bot.sendMessage(chatId, 'Информация о ВУЗе Южно-Казахский ГУ им. М.Ауэзова.');
  }
  else if (mText === 'Назад' && dialog === 'remote_education_kz'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну:', remote_education_country);
    dialog = 'remote_education';
  }
  else if (mText === 'На главную' && dialog === 'remote_education_kz'){
    bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
  }
}); */

//написать о поступлении в ВУЗы например Россия (Гупкина, НОЧУ ВО МЭИ, НОЧУ ВО МИП) и Казахстан (смотреть в Асане)

bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Очное образование в России
  if (mText === 'НОУ ВО МЭИ' && dialog === 'admission_to_the_university_ru'){
    bot.sendMessage(chatId, '\
*Негосударственное образовательное частное учреждение московский экономический институт* — \
это современный учебно-научный и производственный комплекс со своими собственными площадями, \
на базе которых созданы все условия для подготовки специалистов высокой квалификации в различных областях.\n\
\n\
В Московском экономическом институте представлены разные уровни образования от колледжа до аспирантуры. \
В институте можно получить самые современные и востребованные на рынке труда профессии: \
менеджера, экономиста, психолога, дизайнера и др.\n\
\n\
Факультеты:\n\
- Управление персоналом\n\
- Юриспруденция\n\
- Государственное и муниципальное управление\n\
- Менеджмент\n\
- Дизайн\n\
- Бизнес-информатика', default_options);
  }
  else if (mText === 'НОУ ВО МИП' && dialog === 'admission_to_the_university_ru'){
    bot.sendMessage(chatId, 'Информация о ВУЗе НОУ ВО МИП.');
  }
  else if (mText === 'Назад' && dialog === 'admission_to_the_university_ru'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну', admission_to_the_university_country);
    dialog = 'admission_to_the_university';
  }
  else if (mText === 'На главную' && dialog === 'admission_to_the_university_ru'){
    bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
  }
});

/* bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //Поступление в ВУЗы в Казахстане
  if (mText === 'Южно-Казахский ГУ им. М.Ауэзова' && dialog === 'admission_to_the_university_kz'){
    bot.sendMessage(chatId, 'Информация о ВУЗе Южно-Казахский ГУ им. М.Ауэзова.');
  }
  else if (mText === 'Назад' && dialog === 'admission_to_the_university_kz'){
    bot.sendMessage(chatId, 'Выберите пожалуйста страну:', remote_education_country);
    dialog = 'admission_to_the_university';
  }
  else if (mText === 'На главную' && dialog === 'admission_to_the_university_kz'){
    bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
  }
}); */

bot.on('message', (msg) => {
  chatId = msg.chat.id;
  mText = msg.text;
  //О нас
  /* if (mText === 'Где мы находимся?'){
    bot.sendLocation(chatId, 41.305942, 69.284531);
    bot.sendMessage(chatId, 'Адрес в виде текста.');
  } */
  if (mText === 'Контакты' && dialog === 'about'){
    bot.sendMessage(chatId, '+998 97 771 66 83 Бекзод Бахтиярович\n\
+998 94 629 29 28 Дарий\n\
+998 99 830 91 18 Мохир');
  }
  else if (mText === 'На главную' && dialog === 'about'){
    bot.sendMessage(chatId, 'Выберите пожалуйста, что Вас интересует:', start);
  }
});