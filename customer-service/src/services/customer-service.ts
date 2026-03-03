import {
  BadRequestError,
  CustomError,
  NotFoundError,
} from "../utils/custom-error";
import { ErrorCode } from "../utils/enums/error-code";
import { ICustomer } from "../models/customer-model";
import CustomerDBManager from "../domain/customerDBManager";

export default class CustomerService {
  private static instance: CustomerService;
  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }

  private customerDBManager = CustomerDBManager.getInstance();

  async createCustomer(body: ICustomer): Promise<ICustomer> {
    const result = await this.customerDBManager.create(body);

    return result;
  }

  async getCustomer(id: string): Promise<ICustomer> {
    const customer = await this.customerDBManager.findById(id);
    if (!customer) {
      throw new NotFoundError(ErrorCode.CUSTOMER_NOT_FOUND);
    }

    return customer;
  }

  async deposit(data: {
    id: string;
    amount: number;
  }): Promise<ICustomer | null> {
    const { id, amount } = data;

    if (amount < 0) {
      throw new BadRequestError(ErrorCode.INVALID_DEPOSIT_AMOUNT);
    }
    const customer = await this.customerDBManager.findById(id);
    if (!customer) {
      throw new NotFoundError(ErrorCode.CUSTOMER_NOT_FOUND);
    }

    const updatedCustomer = await this.customerDBManager.deposit(id, amount);

    return updatedCustomer;
  }

  async purchase(data: {
    id: string;
    amount: number;
  }): Promise<ICustomer | null> {
    const { id, amount } = data;

    if (amount < 0) {
      throw new BadRequestError(ErrorCode.INVALID_PURCHASE_AMOUNT);
    }
    const customer = await this.customerDBManager.findById(id);
    if (!customer) {
      throw new NotFoundError(ErrorCode.CUSTOMER_NOT_FOUND);
    }
    if (customer.balance < amount) {
      throw new BadRequestError(ErrorCode.INSUFFICIENT_FUNDS);
    }

    const updatedCustomer = await this.customerDBManager.purchase(id, amount);

    return updatedCustomer;
  }

  async transfer(data:{
    fromId: string,
    toId: string,
    amount: number
  }
  ): Promise<{ success: boolean }> {
    const {fromId, toId, amount} = data;

    const fromCustomer = await this.customerDBManager.findById(fromId);
    if (!fromCustomer) {
      throw new NotFoundError(ErrorCode.SENDER_NOT_FOUND);
    }

    const toCustomer = await this.customerDBManager.findById(toId);
    if (!toCustomer) {
      throw new NotFoundError(ErrorCode.RECEIVER_NOT_FOUND);
    }

    if (fromCustomer.balance < amount) {
      throw new BadRequestError(ErrorCode.INSUFFICIENT_FUNDS);
    }

    const purchaseData = { id: fromId, amount };
    const depositData = { id: toId, amount };

    await this.purchase(purchaseData);
    await this.deposit(depositData);

    return { success: true };
  }
}
