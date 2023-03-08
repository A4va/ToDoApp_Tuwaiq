import express, { Application } from 'express';
import routes from './router/index'
import * as dotenv from 'dotenv'
import cors from 'cors';

const app:Application = express();
const port = process.env.PORT

dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/', routes)


app.listen(port, ()=> console.log(`express started on port ${port}`))