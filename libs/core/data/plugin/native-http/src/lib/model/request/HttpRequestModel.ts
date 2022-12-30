export type HttpHeader = {[key: string]: string};
export type HttpBody = {[key: string]: unknown} | Array<unknown>;

export interface HttpBasicHeader extends HttpHeader {
  Accept: string;         // "application/json"
  "Content-Type": string; // "application/json"
  "Cache-Control": string; // "no-cache"
};

interface HttpParams {
  endpoint: string,
  body?: HttpBody,
  headers?: HttpHeader
}

export type HttpGetRequest = Omit<HttpParams, 'body'>;
export type HttpPostRequest = HttpParams;
export type HttpPutRequest = HttpParams;
export type HttpPatchRequest= HttpParams;
export type HttpDeleteRequest = Omit<HttpParams, 'body'>;
