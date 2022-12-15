import type { AxiosResponse } from "axios";
import { HttpHeader, HttpBody } from "./model/Http.types";

export interface HttpInterfaceService {
  get<T>(endpoint: string, headers?: HttpHeader): Promise<AxiosResponse<T>>;

  post<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>>;

  put<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>>;

  patch<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>>;

  delete(endpoint: string, headers?: HttpHeader): Promise<AxiosResponse>;
}
