import { Router } from 'express';
import CustomerController from '../controllers/customer-controller';

const router = Router();
const customerController = new CustomerController();

router.get('/by-id/:id', customerController.getCustomer.bind(customerController));
router.post('/create-customer', customerController.createCustomer.bind(CustomerController));
router.post('/deposit', customerController.deposite.bind(CustomerController));
router.post('/purchase', customerController.purchase.bind(CustomerController));
router.post('/transfer', customerController.transfer.bind(CustomerController));

export default router;



