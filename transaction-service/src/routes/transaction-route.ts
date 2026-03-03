import { Router } from 'express';
import TransactionController from '../controllers/transaction-controller';

const router = Router();
const transactionController = new TransactionController();

    router.post('/deposit', transactionController.topUp.bind(transactionController));
    router.post('/purchase', transactionController.purchase.bind(transactionController));
    router.post('/refund', transactionController.refund.bind(transactionController));
    router.post('/transfer', transactionController.transfer.bind(transactionController));

export default router;



