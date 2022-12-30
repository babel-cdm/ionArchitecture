export type HttpHeader = {[key: string]: string};
export type HttpBody = {[key: string]: unknown} | Array<unknown>;

export interface HttpBasicHeader extends HttpHeader {
  Accept: string;         // "application/json"
  "Content-Type": string; // "application/json"
  "Cache-Control": string; // "no-cache"
};

export interface HttpRequest {
  endpoint: string,
  headers: HttpHeader
  body?: HttpBody,
}

export type HttpGetRequest = Omit<HttpRequest, 'body'>;
export type HttpPostRequest = HttpRequest;
export type HttpPutRequest = HttpRequest;
export type HttpPatchRequest= HttpRequest;
export type HttpDeleteRequest = Omit<HttpRequest, 'body'>;
