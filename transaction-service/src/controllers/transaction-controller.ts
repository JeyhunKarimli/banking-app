import { Request, Response } from 'express';
import TransactionService from '../services/transaction-service';


export default class TransactionController {
    constructor() {}
    private transactionService = TransactionService.getInstance()

    async topUp(req: Request, res: Response) {
        try {
            const response = await this.transactionService.deposit(req.body);
            res.status(201).json(response);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error });
        }
    }

    async purchase(req: Request, res: Response) {
        try {
            const response = await this.transactionService.purchase(req.body);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error });
        }
    }

    async refund(req: Request, res: Response) {
        try {
            const response = await this.transactionService.refund(req.body);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error });
        }
    }

    async transfer(req: Request, res: Response) {
        try {
            const response = await this.transactionService.transfer(req.body);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error });
        }
    }
}
