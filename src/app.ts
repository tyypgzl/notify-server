import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';

import { errorHandler, notFoundHandler } from './middleware';

dotenv.config();

const app = express();

// parse incoming request body and append data to `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// add logger middleware
app.use(morgan('dev'));

// enable all CORS request
app.use(cors());

// adding set of security middlewares
app.use(helmet());

// API
app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
