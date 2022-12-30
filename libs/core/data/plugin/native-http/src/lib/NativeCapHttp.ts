import {
  CapacitorHttp,
  HttpResponse as CapacitorHttpResponse
} from '@capacitor/core';

import type { HttpInterfaceService } from "@native-http/HttpInterfaceService";

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
} from "@native-http/model/request/HttpRequestModel";

import type { HttpResponse } from "@native-http/model/response/HttpResponseModel";

import { HttpErrorResponseMapper } from "@native-http/mapper/response/HttpErrorResponseMapper";
import { HttpSuccessResponseMapper } from "@native-http/mapper/response/HttpSuccessResponseMapper";
import { HttpRequestMapper } from "@native-http/mapper/request/HttpRequestMapper";


export class NativeCapHttp implements HttpInterfaceService {

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
            HttpErrorResponseMapper.fromResponse<T>(`@NativeCapHttp Invalid Status`, response)
          )
        }
      })
      .catch((error: Error) => {
        reject(
          HttpErrorResponseMapper.fromResponse(`@CapacitorHttp Error: ${error.message}`)
        )
      })
    })
  }

  get<T>(httpRequest: HttpGetRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.get(
        HttpRequestMapper.toRequest(httpRequest)
      )
    )
  }

  post<T>(httpRequest: HttpPostRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.post(
        HttpRequestMapper.toRequest(httpRequest)
      )
    )
  }

  put<T>(httpRequest: HttpPutRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.put(
        HttpRequestMapper.toRequest(httpRequest)
      )
    )
  }

  patch<T>(httpRequest: HttpPatchRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.patch(
        HttpRequestMapper.toRequest(httpRequest)
      )
    )
  }

  delete<T>(httpRequest: HttpDeleteRequest): Promise<HttpResponse<T>> {
    return this.dispatchRequest<T>(
      CapacitorHttp.delete(
        HttpRequestMapper.toRequest(httpRequest)
      )
    )
  }
}
