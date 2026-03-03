export class CustomError extends Error {
    public statusCode: number;
    public errorCode: string;
  
    constructor(message: string, statusCode: number, errorCode: string) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      Object.setPrototypeOf(this, new.target.prototype); 
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(errorCode: string = "NOT_FOUND", message = errorCode) {
      super(message, 404, errorCode);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(errorCode: string = "BAD_REQUEST", message = errorCode) {
      super(message, 400, errorCode);
    }
  }
  