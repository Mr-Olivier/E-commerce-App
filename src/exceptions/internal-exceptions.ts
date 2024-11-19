import { HttpException } from "./root";

export class InternalException extends HttpException {
  constructor(message: string, errors: any, erroCode: number) {
    super(message, erroCode, 500, errors);
  }
}
