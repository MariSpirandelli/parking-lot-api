import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const createServer = () => {
  const app = express();
  app.enable('trust proxy');

  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  app.use(express.json());

  app.use(helmet());

  app.get('/status', (_, res) => {
    res.status(200).json({ status: 'up' });
  });

  return app;
};

export default createServer;
