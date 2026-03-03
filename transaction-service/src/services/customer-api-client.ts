import axios from 'axios';
import { CustomError } from '../utils/custom-error';

export default class CustomerApiClient {
  private static instance: CustomerApiClient;
  private baseUrl: string;

  private constructor() {
    const baseUrl = process.env.CUSTOMER_SERVICE_URL;
    this.baseUrl = `http://localhost:3000/customer`;
  }

  public static getInstance(): CustomerApiClient {
    if (!CustomerApiClient.instance) {
      CustomerApiClient.instance = new CustomerApiClient();
    }
    return CustomerApiClient.instance;
  }


  public async deposit(data:{id: string, amount: number}): Promise<any> {
    const url = `${this.baseUrl}/deposit/`;
    return this.makeApiCall(url, data);
  }

  public async purchase(data:{id: string, amount: number}): Promise<any> {
    const url = `${this.baseUrl}/purchase/`;
    return this.makeApiCall(url, data);
  }

  public async transfer(data:{fromId: string, toId: string, amount: number}): Promise<any> {
    const url = `${this.baseUrl}/transfer/`;
    return this.makeApiCall(url, data);
  }

  private async makeApiCall(url: string, data: any): Promise<any> {
    try {
      const response = await axios.post(url, data)

      return response.data;
    } catch (error) {
      // @ts-ignore
      const errorData = error.response.data.error
      throw new CustomError(errorData.errorCode, errorData.statusCode, errorData.errorCode);
    }
  }
}
