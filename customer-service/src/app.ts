import express, { Express } from 'express';
import dotenv from 'dotenv';
import customerRoutes from './routes/customer-routes';
import connectToDB from './domain/mongoose-connection';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

connectToDB();
app.use('/', customerRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
