import { HttpErrorResponse } from "../../model/response/HttpResponseModel";
import { HttpSuccessResponseMapper } from "../../mapper/response/HttpSuccessResponseMapper";

import { HttpResponse as CapacitorHttpResponse} from '@capacitor/core';

export class HttpErrorResponseMapper {

  static fromResponse<T>(message: string, response?: CapacitorHttpResponse): HttpErrorResponse<T>{
    return new HttpErrorResponse(
      message,
      response ? HttpSuccessResponseMapper.fromResponse(response) : undefined
    );
  }

}
