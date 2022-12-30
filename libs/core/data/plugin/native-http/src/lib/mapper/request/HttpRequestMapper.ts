import { HttpBasicHeader, HttpRequest } from "@native-cap-http/model/request/HttpRequestModel";
import { HttpOptions as CapacitorHttpOptions} from '@capacitor/core';


const DEFAULT_HTTP_HEADER: HttpBasicHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export class HttpRequestMapper {

  static toRequest(request: HttpRequest): CapacitorHttpOptions{

    const options: CapacitorHttpOptions = {
      url: request.endpoint,
      headers: {
        ...DEFAULT_HTTP_HEADER,
        ...request.headers,
      }
    };

    if(request.body){
      options.data = request.body
    }

    return options;
  }

}
