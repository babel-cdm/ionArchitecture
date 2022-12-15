import axios, { AxiosResponse } from "axios";
import type { HttpInterfaceService } from "./HttpInterfaceService";

import type { HttpHeader, HttpBody, HttpBasicHeader } from "./model/Http.types";

const BASE_HTTP_HEADER: HttpBasicHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};
export class HttpService implements HttpInterfaceService {

  get<T>(endpoint: string, headers?: HttpHeader): Promise<AxiosResponse<T>> {
    return axios.get<T>(endpoint, {
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
      },
    });
  }

  post<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(endpoint, body, {
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
      },
    });
  }

  put<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>> {
    return axios.put<T>(endpoint, body, {
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
      },
    });
  }

  patch<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader
  ): Promise<AxiosResponse<T>> {
    return axios.patch<T>(endpoint, body, {
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
      },
    });
  }

  delete(endpoint: string, headers?: HttpBody): Promise<AxiosResponse> {
    return axios.delete(endpoint, {
      headers: {
        ...BASE_HTTP_HEADER,
        ...headers,
      },
    });
  }
}
