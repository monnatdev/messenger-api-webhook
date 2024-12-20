import { Router } from 'express';
import { handleWebhook, verifyWebhook } from '../controllers/webhookController';

const router = Router();

router.get('/webhook', verifyWebhook);
router.post('/webhook', handleWebhook);

router.get('/health', (req:any, res:any) => res.send('OK'));

export default router;
