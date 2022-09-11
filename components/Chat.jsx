import React, { useEffect, useRef, useState } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';
import TextBar from './TextBar';
import ChatMessage from './ChatMessage';

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: '#1A1B1E',
    borderRadius: '0.25rem',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "SanFrancisco",
    fontSize: '16px',
    margin: '0 auto 1rem',
    maxWidth: '600px',
    padding: '0.5rem 1.5rem',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '14px'
    }
  }
}))

const Chat = ({ messages, setMessages, newMessages, setNewMessages }) => {
  const viewport = useRef();
  const { classes } = useStyles();
  const [height, setHeight] = useState(100);
  const [disableFields, setDisableFields] = useState(true);

  useEffect(() => {
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

    // Change opacity to 100 for last element if needed
    const copy = messages.slice();
    if (copy.length > 0 && copy[copy.length - 1].opacity === 0) {
      copy[copy.length - 1].opacity = 100;
      setMessages(copy);
      if (newMessages.length === 0) {
        // Delay is needed due to flat 500ms animation transition declared in ChatMessages.jsx
        const enablingFieldsDelay = setTimeout(() => {
          setDisableFields(false);
        }, 500)
      }
    }
    
  }, [messages])

  useEffect(() => {
    if (newMessages.length > 0) {
      setDisableFields(true)
      const newMessage = newMessages[0];
      const messageDelay = setTimeout(() => {
        setMessages([
          ...messages,
          newMessage
        ])
        setNewMessages([
          ...newMessages.slice(1)
        ])
      }, newMessage.delay)

      return () => {
        clearTimeout(messageDelay)
      }
    }


  }, [newMessages])

  return (
    <div style={{height: '90vh'}}>
      <ScrollArea style={{ height: `calc(100% - ${height}px)` }} viewportRef={viewport}>
        <div className={classes.wrapper}>
          {messages.map((m, id) => <ChatMessage content={m.content} fromMe={m.fromMe} emoji={m.type==='emoji'} link={m.type==='link'} text={m.type==='text'} file={m.type==='file'} key={`message-${id}`} opacity={m.opacity}/>)}
        </div>
      </ScrollArea>
      <TextBar setMessages={setMessages} messages={messages} setHeight={setHeight} setNewMessages={setNewMessages} newMessages={newMessages} disableFields={disableFields}/>
    </div>
  );
};

export default Chat;