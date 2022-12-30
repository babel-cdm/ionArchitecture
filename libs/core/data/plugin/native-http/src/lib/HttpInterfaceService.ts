import type { AxiosResponse } from "axios";
import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
} from "./model/HttpRequest.types";

export interface HttpInterfaceService {
  get<T>({endpoint, headers}: HttpGetRequest): Promise<AxiosResponse<T>>;

  post<T>({endpoint, headers, body}: HttpPostRequest): Promise<AxiosResponse<T>>;

  put<T>({endpoint, headers, body}: HttpPutRequest): Promise<AxiosResponse<T>>;

  patch<T>({endpoint, headers, body}: HttpPatchRequest): Promise<AxiosResponse<T>>;

  delete<T>({endpoint, headers}: HttpDeleteRequest): Promise<AxiosResponse<T>>;
}
