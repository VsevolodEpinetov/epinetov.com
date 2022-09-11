import React, { useEffect, useRef, useState } from 'react';
import { Input, createStyles } from '@mantine/core';
import { IconAt, IconPencil, IconSend } from '@tabler/icons';
import { Button } from '@mantine/core';
import TextButton from './TextButton';
import getMessages from '../lib/getMessages';

const useStyles = createStyles((theme) => ({
  bar: {
    border: '1px solid #1A1B1E',
    borderRadius: '7px',
    background: '#5c5c5c',
    width: '100%',
    padding: '0 8px',
    height: '30px'
  },
  sendButton: {
    ['&:hover']: {
    }
  },
  textNoButtons: {
    marginBottom: '5px', 
    color: '#404040', 
    fontSize: '14px',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '12px'
    }
  }
}))

const TextBar = ({ setHeight, setNewMessages, newMessages, disableFields }) => {
  const { classes } = useStyles();
  const [userText, setUserText] = useState('');
  const [sendButtonIsDisabled, setSendButtonIsDisabled] = useState(true);
  const phrases = [
    'Кто ты?', 
    'Откуда ты?', 
    'Чем ты занимаешься?', 
    'Резюме', 
    'Этикет', 
    'Проекты', 
    'Портфолио', 
    'Привет', 
    '👋', 
    'Пинг', 
    'Как дела?', 
    'Как дела',
    '/help',
    'Команды',
    '/hi',
    '/cv',
    '/portfolio',
    'Что ты окончил?',
    'Где ты учился?',
    'Как с тобой можно связаться?',
    'Контакты'
  ];
  const [randomPhrase, setRandomPhrase] = useState('')
  const [buttons, setButtons] = useState(['Кто ты?'])
  const buttonsWrapper = useRef(null);
  const chatElement = useRef(null);

  const sendMessages = (text = userText) => {
    console.log(text);
    const messagesToAdd = getMessages(text)
    const newArray = newMessages.concat(messagesToAdd);

    setRandomPhrase(phrases[Math.floor(Math.random()*phrases.length)])
    setNewMessages(newArray)
    setUserText('');
    setSendButtonIsDisabled(true);
  }

  const validateText = (text) => {
    phrases.forEach(p => {
      if (text.toLowerCase() == p.slice(0, text.length).toLowerCase()) {
        setUserText(text);
        if (text.toLowerCase() == p.toLowerCase()) setSendButtonIsDisabled(false) 
        else setSendButtonIsDisabled(true);
        return;
      }
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      let exist = false;
      phrases.forEach(p => {
        if (userText.toLowerCase() == p.toLowerCase()) {
          exist = true;
        }
      })

      if (exist) sendMessages();
    }
  }

  useEffect(() => {
    let newHeight = buttonsWrapper.current.clientHeight + chatElement.current.clientHeight;

    if (buttons.length === 0) {
      setRandomPhrase(phrases[Math.floor(Math.random()*phrases.length)])
    } else {
      newHeight -= 30;
    }

    setHeight(newHeight)

  }, [buttons])

  return (
    <div>
      <div ref={buttonsWrapper}>
        {buttons.length > 0 ?
          buttons.map((b, id) => <TextButton text={b} key={`button-${id}`} sendMessages={sendMessages} setButtons={setButtons} buttons={buttons} disableFields={disableFields}/>)
          :
          <p className={classes.textNoButtons}>Полный полёт фантазии! Попробуй, например: {randomPhrase}</p>
        }
      </div>
      <Input
        icon={<IconPencil />}
        placeholder="Сообщение..."
        value={userText}
        onKeyDown={handleKeyDown}
        onChange={(e) => validateText(e.target.value)}
        ref={chatElement}
        disabled={disableFields}
        rightSection={
          <Button
            leftIcon={
              <IconSend
              />
            }
            variant="subtle"
            styles={() => ({
              root: {
                padding: 0
              },
              leftIcon: {
                marginRight: 0
              }
            })}
            compact
            disabled={sendButtonIsDisabled ? true : false}
            className={classes.sendButton}
            onClick={() => sendMessages()}
          />
        }
      />
    </div>
  );
};

export default TextBar;