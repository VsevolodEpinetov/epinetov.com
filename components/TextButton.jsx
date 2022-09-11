import { createStyles, Button } from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
  button: {
    
  }
}))

const TextButton = ( {text, sendMessages, setButtons, buttons, disableFields} ) => {
  const { classes } = useStyles();

  const changeButtons = (pressedButton) => {
    const id = buttons.indexOf(pressedButton);
    let copy = [
      ...buttons.slice(0, id),
      ...buttons.slice(id + 1)
    ]

    switch (pressedButton) {
      case 'Кто ты?':
        copy.push('Откуда ты?')
        copy.push('А у тебя есть резюме?')
      break;

      case 'Откуда ты?':
        copy.push('Где ты учился?')
        copy.push('Чем ты занимаешься?')
      break;

      case 'Чем ты занимаешься?':
        copy.push('Можешь показать свои проекты?')
        copy.push('А у тебя есть резюме?')
      break;

      case 'А у тебя есть резюме?':
        copy.push('Как с тобой можно связаться?')
      break;
    }

    setButtons(copy)
  }

  return (
    <Button 
      disabled={disableFields}
      variant="outline" 
      styles={() => ({
        root: {
          margin: '0 10px 10px 0',
          transition: 'color 300ms ease-in'
        }
      })}
      onClick={() => {
        sendMessages(text)
        changeButtons(text)
      }}
    >
      {text}
    </Button>
  );
};

export default TextButton;