import { NextFunction, Request, Response, response } from "express";
import CustomerService from "../services/customer-service";

export default class CustomerController {

  async createCustomer(req: Request, res: Response) {
    const customerService = CustomerService.getInstance();
    try {
      const response = await customerService.createCustomer(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error });
    }
  }

  async getCustomer(req: Request, res: Response) {
    const customerService = CustomerService.getInstance();
    try {
      const response = await customerService.getCustomer(req.params.id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error:error.message });
    }
  }

  async deposite(req: Request, res: Response) {
    const customerService = CustomerService.getInstance();
    try {
      const response = await customerService.deposit(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error });
    }
  }

  async purchase(req: Request, res: Response) {
    const customerService = CustomerService.getInstance();
    try {
      const response = await customerService.purchase(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error });
    }
  }

  async transfer(req: Request, res: Response) {
    const customerService = CustomerService.getInstance();
    try {
      const response = await customerService.transfer(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error });
    }
  }
  
}
