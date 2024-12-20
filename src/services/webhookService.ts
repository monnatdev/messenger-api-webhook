import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN as string;

export const callSendAPI = (sender_psid: string, response: string) => {
  const request_body = {
    recipient: {
      id: sender_psid
    },
    message: {
      text: response
    }
  };

  axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, request_body)
    .then(() => {
      console.log('Message sent!');
    })
    .catch(err => {
      console.error('Unable to send message:', err);
    });
};