import Transaction, { ITransaction } from '../models/transaction.model';
import { TransactionType } from '../utils/enums/transaction-type';

export default class TransactionDBManager {
    private static instance: TransactionDBManager;

    private constructor() {} 
  
    public static getInstance(): TransactionDBManager {
      if (!TransactionDBManager.instance) {
        TransactionDBManager.instance = new TransactionDBManager();
      }
      return TransactionDBManager.instance;
    }

    async create(data: Partial<ITransaction>): Promise<ITransaction> {
        const transaction = new Transaction(data);
        return await transaction.save();
    }

    async findById(id: string): Promise<ITransaction | null> {
        const transaction = await Transaction.findById(id).exec();
        return transaction;
    }

    async update(id: string, updateData: Partial<ITransaction>): Promise<ITransaction | null> {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, updateData, { new: true }).exec();
        return updatedTransaction;
    }

    async getLatest(id: string, type: TransactionType): Promise<ITransaction | null> {
        const latestTransaction = await Transaction.findOne({ fromId: id, type }).sort({ createdAt: -1 });
        return latestTransaction;
    }
}
