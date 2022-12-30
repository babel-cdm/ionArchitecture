import { HttpHeader } from "@native-http/model/request/HttpRequestModel";

export interface HttpSuccessResponse<T>  {
  status: number;
  statusText: string;
  data: T;
  headers: HttpHeader;
}

export class HttpErrorResponse<T> extends Error {
  response?: HttpSuccessResponse<T>;

  constructor(message?: string, response?: HttpSuccessResponse<T>) {
    super(message);
    this.name = 'HttpErrorResponse';
    Object.setPrototypeOf(this, new.target.prototype);
    response && (this.response = response);
  }
}

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpErrorResponse<T>;
