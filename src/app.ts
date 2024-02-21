import express, { Express } from 'express';
import { shortenUrlRouter } from './routes/shortenUrl.route';
import { errorHandler } from './middlewares/errorHandler.middleware';

// App creation
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/shortenUrl', shortenUrlRouter);

// Error handling
app.use(errorHandler);

export { app };
