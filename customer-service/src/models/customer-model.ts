import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  surname: string;
  birthDate: Date;
  gsmNumber: string;
  balance: number;
}

const CustomerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gsmNumber: {
      type: String,
      required: true,
      unique: true, 
    },
    balance: {
      type: Number,
      default: 100, 
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
