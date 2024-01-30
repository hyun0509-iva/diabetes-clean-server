import HttpException from "@/exceptions/httpException";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "네트워크 오류입니다.";
  res.status(status).send({ status, message });
};

export default errorMiddleware;
