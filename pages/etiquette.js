import { Title, Container, List, Text, Accordion } from '@mantine/core';
import Link from 'next/link'
import HeaderImage from '../public/img/header.png'
import { Image } from '@mantine/core';
import ListOfRules from '../components/ListOfRules';

const RULES = [
  {
    title: `Не начинайте сообщение с "Привет!"`,
    description: <Text>Сообщения, начинающиеся с "Привет!", замедляет ответ собеседника. Подробнее - <Link href="https://nohello.net/en/" target="_blank"><a>https://nohello.net/en/</a></Link></Text>
  },
  {
    title: `Отвечайте на мемы`,
    description: `Плохой тон - игнорировать своего собеседника. Даже, если он прислал смешную картинку. Дайте понять, что вы просмотрели изображение, отправив хотя бы скобочку.`
  },
  {
    title: `Ещё что-нибудь`,
    description: `Тут ещё что-нибудь. Да`
  }
]

function EtiquettePage() {
  return (
    <div>
      <Container style={{ paddingTop: "25px" }}>
        <Link href="/">
          <a>← К главной</a>
        </Link>
        <Image
          src='../img/header.png'
          alt="Random unsplash image"
          height={40}
          fit="contain"
        />
        <Title order={1} style={{ color: "#404040", paddingTop: "25px" }}>
          <Text style={{ fontWeight: '700', fontFamily: 'Roboto' }}>Базовые правила этикета</Text>
        </Title>
        <Text>
          Базовый текст для базовых правил этикета в интернете
        </Text>
        <ListOfRules rules={RULES} />
      </Container>
    </div>
  )
}

export default EtiquettePage