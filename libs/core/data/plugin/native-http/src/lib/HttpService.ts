import {
  CapacitorHttp,
  HttpResponse as CapacitorHttpResponse
} from '@capacitor/core';

import type { HttpInterfaceService } from "./HttpInterfaceService";

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
  HttpBasicHeader
} from "./model/request/HttpRequestModel";

import type { HttpResponse } from "./model/response/HttpResponseModel";

import { HttpErrorResponseMapper } from "./mapper/response/HttpErrorResponseMapper";
import { HttpSuccessResponseMapper } from "./mapper/response/HttpSuccessResponseMapper";

const DEFAULT_HTTP_HEADER: HttpBasicHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export class HttpService implements HttpInterfaceService {

  private dispatchRequest<T>(promise: Promise<CapacitorHttpResponse>): Promise<HttpResponse<T>>{

    const validateStatus = (status: number) => {
      return status >= 200 && status < 300;
    };

    return new Promise((resolve, reject) => {
      promise
      .then((response: CapacitorHttpResponse) => {
        if(validateStatus(response.status)){
          resolve(
            HttpSuccessResponseMapper.fromResponse<T>(response)
          );
        }
        else{
          reject(
            HttpErrorResponseMapper.fromResponse<T>(`Invalid Status`, response)
          )
        }
      })
      .catch((error: Error) => {
        reject(
          HttpErrorResponseMapper.fromResponse(`Capacitor Error: ${error.message}`)
        )
      })
    })
  }

  get<T>({endpoint, headers}: HttpGetRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.get({
        url: endpoint,
        headers: {
          ...DEFAULT_HTTP_HEADER,
          ...headers,
        }
      })
    )
  }

  post<T>({endpoint, headers, body}: HttpPostRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.post({
        url: endpoint,
        data: body,
        headers: {
          ...DEFAULT_HTTP_HEADER,
          ...headers,
        }
      })
    )
  }

  put<T>({endpoint, headers, body}: HttpPutRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.put({
        url: endpoint,
        data: body,
        headers: {
          ...DEFAULT_HTTP_HEADER,
          ...headers,
        }
      })
    )
  }

  patch<T>({endpoint, headers, body}: HttpPatchRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.patch({
        url: endpoint,
        data: body,
        headers: {
          ...DEFAULT_HTTP_HEADER,
          ...headers,
        }
      })
    )
  }

  delete<T>({endpoint, headers}: HttpDeleteRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.delete({
        url: endpoint,
        headers: {
          ...DEFAULT_HTTP_HEADER,
          ...headers,
        }
      })
    )
  }
}
