import React from 'react';
import { createStyles, Grid } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  message: {
    borderRadius: '8px',
    lineHeight: 1.25,
    maxWidth: '75%',
    padding: '0.5rem .875rem',
    position: 'relative',
    wordWrap: 'break-word',
    transition: 'opacity 500ms ease-in',
    ['&:before']: {
      bottom: '-0.1rem',
      content: '""',
      height: '1rem',
      position: 'absolute',
    },
    ['&:after']: {
      bottom: '-0.1rem',
      content: '""',
      height: '1rem',
      position: 'absolute',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '95%'
    }
  },
  fromMe: {
    alignSelf: 'flex-end',
    background: 'linear-gradient(90deg, #4f5aa9, #3e739d)',
    color: '#fff',
    margin: '0.5rem 0',
    width: 'fit-content',
    ["&:before"]: {
      borderRight: '1rem solid #3e739d',
      right: '-8px',
      transform: 'translate(0, -2px)'
    },
    ['&:after']: {
      backgroundColor: '#1A1B1E',
      borderBottomLeftRadius: '10px',
      right: '-40px',
      transform: 'translate(-30px, -1px)',
      height: '20px',
      width: '10px'
    }
  },
  fromThem: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
    color: '#000',
    margin: '0.5rem 0',
    width: 'fit-content',
    ["&:before"]: {
      borderLeft: '1rem solid #e5e5ea',
      left: '-0.35rem',
      transform: 'translate(0, -2px)'
    },
    ['&:after']: {
      backgroundColor: '#1A1B1E',
      borderBottomRightRadius: '10px',
      left: '20px',
      transform: 'translate(-30px, -1px)',
      height: '20px',
      width: '10px'
    }
  },
  emoji: {
    background: 'none !important',
    fontSize: '2.5rem',
    ['&:before']: {
      display: 'none'
    }
  },
  ['link-wrapper']: {
    borderLeft: '3px solid white',
    paddingLeft: '12px',
    display: 'flex',
    marginTop: '10px'
  },
  ['link-image']: {
    maxHeight: '90px'
  },
  ['link-text']: {
    paddingRight: '15px'
  },
  title: {
    padding: '0 10px 10px 0',
    margin: '0'
  },
  link: {
    color: 'white',
    marginBottom: '10px',
    ['&:hover']: {
      color: 'white'
    }
  },
  description: {
    margin: '0',
  },
  fileImage: {

  },
  fileLink: {
    textDecoration: 'none',
    color: 'white',
    ['&:hover']: {
      textDecoration: 'none',
      color: 'white',
    },
    ['&:active']: {
      textDecoration: 'none',
      color: 'white',
    },
    ['&:visited']: {
      textDecoration: 'none',
      color: 'white',
    }
  }
}))

const ChatMessage = ({ content, fromMe, emoji, opacity, link, text, file }) => {
  const { classes } = useStyles();
  return (
    <div className={`${classes.message} ${fromMe ? classes.fromMe : classes.fromThem} ${emoji ? classes.emoji : ''}`} style={{ opacity: opacity }}>
      {(text || emoji) && content}
      {link &&
        (
          <div>
            <a href={content.href} className={classes.link} target="_blank">{content.text}</a>
            <a href={content.href} className={classes.link} target="_blank" style={{textDecoration: 'none'}}>
              <div className={classes['link-wrapper']}>
                <div className={classes['link-text']}>
                  <h3 className={classes.title}>{content.title}</h3>
                  <p className={classes.description}>{content.description}</p>
                </div>
                <div>
                  <img src={content.preview} className={classes['link-image']} />
                </div>
              </div>
            </a>
          </div>
        )
      }
      {file &&
        (
          <div>
            <a href={content.href} className={classes.fileLink} target="_blank">
              <Grid>
                <Grid.Col span={4}>
                  <img src={content.preview} className={classes.fileImage} style={{ maxHeight: '70px' }} />
                </Grid.Col>
                <Grid.Col span={8}>
                  <h3 className={classes.title}>{content.title}</h3>
                  <p className={classes.description}>{content.description}</p>
                </Grid.Col>
              </Grid>
            </a>
          </div>
        )
      }
    </div>
  );
};

export default ChatMessage;