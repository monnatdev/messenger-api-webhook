import { Request, Response } from 'express';
import { callSendAPI } from '../services/webhookService';

const VERIFY_TOKEN = 'monnat123';

export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400); 
  }
};

export const handleWebhook = (req: Request, res: Response) => {
  const body = req.body;

  console.log('🟪 Received webhook:');
  console.dir(body, { depth: null });

  if (body.object === 'page') {
    body.entry.forEach((entry: { messaging: any[]; }) => {
      const webhookEvent = entry.messaging[0];
      const senderId = webhookEvent.sender.id;
      const messageText = webhookEvent.message.text;

      console.log(`Message from ${senderId}: ${messageText}`);

      // Respond to the message
      callSendAPI(senderId, `You said: ${messageText}`);
    });

    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
};