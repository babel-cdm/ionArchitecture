import axios, { AxiosResponse } from "axios";
import type { HttpInterfaceService } from "./HttpInterfaceService";

import type {
  HttpDeleteRequest,
  HttpGetRequest,
  HttpPatchRequest,
  HttpPostRequest,
  HttpPutRequest,
  HttpBasicHeader
} from "./model/HttpRequest.types";

const DEFAULT_HTTP_HEADER: HttpBasicHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export class HttpService implements HttpInterfaceService {

  get<T>({endpoint, headers}: HttpGetRequest): Promise<AxiosResponse<T>> {
    return axios.get<T>(endpoint, {
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...headers,
      },
    });
  }

  post<T>({endpoint, headers, body}: HttpPostRequest): Promise<AxiosResponse<T>> {
    return axios.post<T>(endpoint, body, {
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...headers,
      },
    });
  }

  put<T>({endpoint, headers, body}: HttpPutRequest): Promise<AxiosResponse<T>> {
    return axios.put<T>(endpoint, body, {
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...headers,
      },
    });
  }

  patch<T>({endpoint, headers, body}: HttpPatchRequest): Promise<AxiosResponse<T>> {
    return axios.patch<T>(endpoint, body, {
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...headers,
      },
    });
  }

  delete({endpoint, headers}: HttpDeleteRequest): Promise<AxiosResponse> {
    return axios.delete(endpoint, {
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...headers,
      },
    });
  }
}
