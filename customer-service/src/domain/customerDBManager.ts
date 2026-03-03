import Customer, { ICustomer } from "../models/customer-model";

export default class CustomerDBManager  {
    private static instance: CustomerDBManager;

  private constructor() {} 

  public static getInstance(): CustomerDBManager {
    if (!CustomerDBManager.instance) {
      CustomerDBManager.instance = new CustomerDBManager();
    }
    return CustomerDBManager.instance;
  }

    async create(body: Partial<ICustomer>): Promise<ICustomer> {
        const customer = new Customer(body);
        return customer.save();
    }

    async findById(id: string): Promise<ICustomer | null> {
        return Customer.findById(id);
    }

    async deposit(id: string, amount: number): Promise<ICustomer | null> {
        return await Customer.findByIdAndUpdate(
            id,
            { $inc: { balance: amount } },
            { new: true }
        ).exec();
    }

    async purchase(id: string, amount: number): Promise<ICustomer | null> {
        return await Customer.findByIdAndUpdate(
            id,
            { $inc: { balance: -amount } },
            { new: true }
        ).exec();
    }
}
