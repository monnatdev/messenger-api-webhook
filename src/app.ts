import express from 'express';
import http from 'http';
import logger from './middleware/logger';
import webhookRoutes from './routes/webhookRoute';

const app = express();

app.use(express.json());

app.use(logger);

app.use('/', webhookRoutes);

http.createServer(app).listen(3000, () => {
  console.log('Server is listening on port 3000');
});