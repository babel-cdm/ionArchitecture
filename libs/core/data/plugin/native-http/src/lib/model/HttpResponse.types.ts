import { HttpBody, HttpHeader } from "./HttpRequest.types";

export interface HttpResponse<T extends HttpBody>  {
  status: number;
  statusText: string;
  data: T;
  headers: HttpHeader;
}

export interface HttpResponseError<T extends HttpBody> extends Error {
  // message: string;
  // name: 'HttpError';
  response?: HttpResponse<T>;
}

//resolve
// const response = {
//   status: res.statusCode,
//   statusText: res.statusMessage,
//   headers: new AxiosHeaders(res.headers),
//   config,
//   request: lastRequest
// };

// return settle(resolve, reject, {
//   status: 405,
//   statusText: 'method not allowed',
//   headers: {},
//   config
// });
