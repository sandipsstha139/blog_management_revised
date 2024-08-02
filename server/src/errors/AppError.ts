class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = this.name;
    this.statusCode = statusCode;

    this.statusCode = `${statusCode}`.startsWith("4") ? 400 : 500;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
