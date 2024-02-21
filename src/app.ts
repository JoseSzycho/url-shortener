import express, { Express } from 'express';

// App creation
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

// Error handling

export { app };
