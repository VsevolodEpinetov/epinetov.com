const defaultUserMessage = (text, delay = 0) => {
  const message = {
    type: 'text',
    fromMe: false,
    opacity: 0,
    content: text,
    delay: delay
  }
  return message;
}

const defaultMyMessage = (text, delay = 1000, type = 'text', {href, description, title, preview} = {}) => {
  const message = {
    type: type,
    fromMe: true,
    opacity: 0,
    delay: delay
  }

  let content;

  switch (type) {
    case 'text':
      content = text
      break;
    case 'link':
      content = {
        href: href || '#',
        text: text,
        description: description || 'Ссылка описание',
        title: title || 'Ссылка заголовок',
        preview: preview
      }
      break;
    case 'file':
      content = {
        preview: preview,
        title: title || 'Файл',
        description: description,
        href: href
      }
      break;
    case 'emoji':
      content = <img src={`../img/${text}-emoji.png`}  style={{maxHeight: '40px'}}/>
  }

  message.content = content;
  return message;
}


function getMessages(text) {
  const messagesToAdd = [];
  const _ = undefined;

  const getMessage = (args) => { messagesToAdd.push(defaultUserMessage(args)) }
  const sendMessage = (args) => { messagesToAdd.push(defaultMyMessage(args)) }
  const sendLink = (text, delay, content) => { messagesToAdd.push(defaultMyMessage(text, delay, 'link', content)) }
  const sendFile = (delay, content) => { messagesToAdd.push(defaultMyMessage(_, delay, 'file', content)) }
  const sendEmoji = (emoji, delay) => {messagesToAdd.push(defaultMyMessage(emoji, delay, 'emoji'))}

  switch (text.toLowerCase()) {
    case 'кто ты?':
      getMessage('Кто ты?')
      sendMessage('Я - Всеволод Епинетов. Мне 26 лет :)')
    break;

    case 'откуда ты?':
      getMessage('Откуда ты?')
      sendMessage('Я жил в Астрахани и Санкт-Петербурге. Сейчас нахожусь в Москве.')
    break;

    case 'education':  
    case 'образование':
    case 'что ты окончил?':
    case 'где ты учился?':
      getMessage('Где ты учился?')
      sendMessage('Мой альма матер - Санкт-Петербургский университет гражданской авиации. Учился на факультете лётной эксплуатации, окончил с отличием по специальности "Организация использования воздушного пространства"')
    break;

    case 'работа':
    case 'чем ты занимаешься?':
      getMessage('Чем ты занимаешься?')
      sendMessage('Основная моя работа - диспетчер РЛУ и ПК в МЦ АУВД (подход, А7Д7). Работаю там с 2019 года.')
      sendMessage('А моё хобби - создание сайтов и ботов. Пишу на JavaScript, для сайтов использую NextJS (React), для ботов - telegraf.js.')
    break;

    case 'этикет':
      getMessage('Дай ссылку на страничку с этикетом интернета')
      sendMessage('Конечно, держи:')
      sendLink('Этикет', _, {
        href: './etiquette',
        description: 'Страничка с этикетом',
        title: 'Этикет заголовок',
        preview: '../img/project-1.png'
      })
    break;

    case '/portfolio':
    case 'проекты':
    case 'портфолио':
    case 'можешь показать свои проекты?':
      getMessage('Можешь показать свои проекты?')
      sendMessage('Естественно! На один из них ты смотришь прямо сейчас, кстати) Но держи ещё:')
      sendLink('https://tarkov-gungame.vercel.app/', _, {
        href: 'https://tarkov-gungame.vercel.app/',
        description: 'Это трекер прогресса для игры Escape From Tarkov. Пользователи могут выбирать оружие и моды к нему, продвигаясь по уровням. Есть переключалка ночного/дневного режимов. Хранение данных в cookies. NextJS.',
        title: 'Tarkov GunGame',
        preview: '../img/project-1.png'
      })
      sendLink('https://atc.epinetov.com/', _, {
        href: 'https://atc.epinetov.com/',
        description: 'Сайт, содержащий справочную информацию для диспетчеров ГА. Динамическое построение страниц с помощью NextJS на основании .md файлов. Разные виды тестирования. Работа с БД Firestore (аутентификация, хранение данных и файлов).',
        title: 'Информация по ОВД | ATC',
        preview: '../img/project-2.png'
      })
      sendLink('https://github.com/VsevolodEpinetov/telegram-bot-subscription', _, {
        href: 'https://github.com/VsevolodEpinetov/telegram-bot-subscription',
        description: 'Бот в телеграм, реализующий функционал платного канала. Если есть активная подписка - сообщения приходят пользователю, в других случаях нет. Оплата через QIWI, функционал - telegraf.js. Хранение сессий в Redis.',
        title: 'Vsevolod Epinetov repository',
        preview: '../img/project-3.png'
      })
      sendLink('Github', _, {
        href: 'https://github.com/VsevolodEpinetov/awesomeo_3000_public',
        description: 'Экосистема для внутренних процессов саппорта Яндекс.Драйв. Впоследствии легла в основу системы управления и администрирования команды саппорта.',
        title: 'AWESOME-O 3000',
        preview: '../img/project-4.png'
      })
      sendMessage('Проект AWESOME-O 3000 очень большой, поэтому расскажу подробнее. Прежде всего это бот для телеги (telegraf.js) с обширным функционалом, который меняется в зависимости от чата, в котором используется и человека, вызвавшего команду (внутренняя система пользователей с модерируемыми ролями). Асинхронная разработка, хранение данных в redis, регулярные процессы через CRON, запросы к API Stattrek, API Yandex.Maps и пр. Всё разделено на отдельно подключаемые модули. Также это несколько очень похожих сайтов, через которые люди заполняли отчёты по работе. Передача данных между сервером и клиентом через Socket.IO, ExpressJS, NodeJS.')
    break;

    case '/cv':
    case 'резюме':
    case 'а у тебя есть резюме?':
      getMessage('А у тебя есть резюме?')
      sendMessage('Да! Сейчас отправлю')
      sendFile(_, {
        preview: '../img/pdf-file.png',
        description: 'Файл .pdf, 144 KB',
        href: '../files/cv.pdf',
        title: 'Резюме Всеволод Е.'
      })
    break;

    case 'пинг':
      getMessage('Пинг')
      sendMessage('Понг!')
    break;

    case '/hi':
    case 'привет':
    case '👋':  
      getMessage('Привет')
      sendMessage('Приветули 8)')
    break;

    case 'как дела':
    case 'как дела?':
      getMessage('Как дела?')
      sendMessage('Да вроде нормально. Но имей в виду, что я не чат-бот (по-крайней мере пока что), количество фраз у меня ограничено')
      sendMessage('Это так, чисто для информации)')
    break;

    case 'команды':
    case '/help':
      getMessage('/help')
      sendEmoji('salut')
      sendMessage(<>Вот список команд:<br />/help - помощь<br />/cv - резюме<br />/hi - привет<br />/portfolio - портфолио</>)
    break;

    case 'контакты':
    case 'как с тобой можно связаться?':
      getMessage('Как с тобой можно связаться?')
      sendMessage(<>Можешь написать мне в телеграм: <a href="https://t.me/epinetov" style={{color: '#fff'}}>@epinetov</a>. Ну или на почту epinetov-website@outlook.com.</>)
    break;
  }

  return messagesToAdd;
}


export default getMessages;