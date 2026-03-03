import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectToDB from './domain/mongoose-connection';
import transactionRoutes from './routes/transaction-route';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3002;

connectToDB();

app.use('/', transactionRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})