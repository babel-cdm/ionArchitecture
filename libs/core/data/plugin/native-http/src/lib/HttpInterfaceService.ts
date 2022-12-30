import { HttpResponse } from "@native-http/model/response/HttpResponseModel";

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
} from "@native-http/model/request/HttpRequestModel";

export interface HttpInterfaceService {
  get<T>({endpoint, headers}: HttpGetRequest): Promise<HttpResponse<T>>;

  post<T>({endpoint, headers, body}: HttpPostRequest): Promise<HttpResponse<T>>;

  put<T>({endpoint, headers, body}: HttpPutRequest): Promise<HttpResponse<T>>;

  patch<T>({endpoint, headers, body}: HttpPatchRequest): Promise<HttpResponse<T>>;

  delete<T>({endpoint, headers}: HttpDeleteRequest): Promise<HttpResponse<T>>;
}
