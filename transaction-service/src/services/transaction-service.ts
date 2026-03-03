import { ErrorCode } from '../utils/enums/error-code';
import mongoose from 'mongoose';
import { TransactionType } from '../utils/enums/transaction-type';
import TransactionDBManager from '../domain/transactionDBManager';
import CustomerApiClient from './customer-api-client';
import { ITransaction } from '../models/transaction.model';
import { BadRequestError, CustomError, NotFoundError } from '../utils/custom-error';

export default class TransactionService {
    private static instance: TransactionService;
    public static getInstance(): TransactionService {
      if (!TransactionService.instance) {
        TransactionService.instance = new TransactionService();
      }
      return TransactionService.instance;
    }
  
    private transactionDBManager = TransactionDBManager.getInstance();
    private customerApiClient = CustomerApiClient.getInstance();

    async deposit(data:{customerId: string, amount: number}): Promise<ITransaction> {
        try {
            const {customerId, amount} = data;
            await this.customerApiClient.deposit({id: customerId, amount});

            const transactionData: Partial<ITransaction> = {
                fromId: customerId,
                amount,
                type: TransactionType.DEPOSIT,
            };

            const transaction = await this.transactionDBManager.create(transactionData);

            return  transaction;
        } catch (error: any) {
            throw new CustomError(error.message,error.statusCode, error.message);
        }
    }

    async purchase(data:{customerId: string, amount: number}): Promise<ITransaction> {
        try {
            const {customerId, amount} = data;
            await this.customerApiClient.purchase({id:customerId, amount});

            const transactionData: Partial<ITransaction> = {
                fromId: customerId,
                amount,
                type: TransactionType.PURCHASE,
            };

            const transaction = await this.transactionDBManager.create(transactionData);

            return  transaction;
        } catch (error: any) {
            throw new CustomError(error.message,error.statusCode, error.message);
        }
    }

    async refund(data:{customerId: string, amount: number}): Promise<ITransaction> {
        try {
            const {customerId, amount} = data;
            const latestTransaction = await this.transactionDBManager.getLatest(customerId, TransactionType.PURCHASE);

            if (!latestTransaction) {
                throw new NotFoundError(ErrorCode.TRANSACTION_NOT_FOUND);
            }
            if (latestTransaction.amount < amount) {
                throw new BadRequestError(ErrorCode.INVALID_AMOUNT);
            }

            await this.customerApiClient.deposit({id:customerId, amount});

            const refundData: Partial<ITransaction> = {
                fromId: customerId,
                amount,
                type: TransactionType.REFUND,
                refoundTransaction: latestTransaction.id
            };

            const transaction = await this.transactionDBManager.create(refundData);

            return transaction;
        } catch (error: any) {
            throw new CustomError(error.message,error.statusCode, error.message);
        }
    }

    async transfer(data: {fromId: string, toId: string, amount: number}): Promise<ITransaction> {
        try {
            const {fromId, toId, amount} =data;
            await this.customerApiClient.transfer({fromId, toId, amount});

            const transactionData: Partial<ITransaction> = {
                fromId,
                toId,
                amount,
                type: TransactionType.TRANSFER,
            };

            const transaction = await this.transactionDBManager.create(transactionData);

            return transaction;
        } catch (error: any) {
            throw new CustomError(error.message,error.statusCode, error.message);
        }
    }
}
