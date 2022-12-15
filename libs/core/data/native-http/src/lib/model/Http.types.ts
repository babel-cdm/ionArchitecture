export type HttpHeader = {[key: string]: string};
export type HttpBody = {[key: string]: unknown};

export type HttpBasicHeader = HttpHeader & {
  Accept: string; // "application/json"
  "Content-Type": string; // "application/json"
  "Cache-Control": string; // "no-cache"
};
