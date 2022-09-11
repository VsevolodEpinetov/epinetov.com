import { Container } from "@mantine/core"
import Chat from "../components/Chat"
import { useState } from "react"

function HomePage() {
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState([
    {
      type: 'emoji',
      content: <><img src='../img/wave-emoji.png' style={{maxHeight: '40px'}}/></>,
      fromMe: true,
      opacity: 0,
      delay: 500
    },
    {
      type: 'text',
      content: 'Привет! Меня зовут Всеволод Епинетов, а это моя страничка.',
      fromMe: true,
      opacity: 0,
      delay: 1000
    },
    {
      type: 'text',
      content: 'Попробуй задать вопрос в текстовом поле внизу. Варианты ограничены, но есть кнопки с подсказками 😉',
      fromMe: true,
      opacity: 0,
      delay: 1000
    }
  ]);

  return (
    <Container style={{ paddingTop: '40px'}}>
      <Chat messages={messages} setMessages={setMessages} newMessages={newMessages} setNewMessages={setNewMessages}/>
    </Container>
  )
}

export default HomePage