import mongoose, { Schema, Document } from "mongoose";
import { TransactionType } from "../utils/enums/transaction-type";

export interface ITransaction extends Document {
  fromId: string;
  toId?: string;
  amount: number;
  type: TransactionType;
  refoundTransaction?: string;
}

const TransactionSchema: Schema = new Schema(
  {
    fromId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toId: {
      type: Schema.Types.ObjectId,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: TransactionType,
      required: true,
    },
    refoundTransaction: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);

export default Transaction;
