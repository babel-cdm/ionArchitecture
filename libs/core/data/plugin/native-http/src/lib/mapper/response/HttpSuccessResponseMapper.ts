import { HttpSuccessResponse } from "@native-http/model/response/HttpResponseModel";
import HttpStatusCode from "@native-http/model/response/HttpStatusModel";

import { HttpResponse as CapacitorHttpResponse} from '@capacitor/core';

export class HttpSuccessResponseMapper {

  static fromResponse<T>(response: CapacitorHttpResponse): HttpSuccessResponse<T>{
      return {
        status: response.status,
        statusText: HttpStatusCode[response.status],
        data: response.data,
        headers: response.headers
      }
  }

}
