import type { AxiosResponse } from "axios";
import { Subject, Observable, defer, firstValueFrom } from "rxjs";

import {
  HttpService,
  HttpStatusCode,
  HttpBody,
  HttpHeader
} from "@ionic-arch/core/data/native-http";
import { AuthService } from "@ionic-arch/core/domain/auth-service";

import type { AuthHttpInterfaceService } from "./AuthHttpInterfaceService";

import type { BaseAuthHttpHeader } from "./model/BaseAuthHttpHeader";
import { ExpiresAt } from "./model/ExpiresAt";

export class AuthHttpService implements AuthHttpInterfaceService {
  private isFetchingAcessToken: boolean = false;
  private isKeepAlivePending: boolean = false;

  private newAuthRequest: Subject<ExpiresAt> = new Subject<ExpiresAt>();
  public newAuthRequest$: Observable<ExpiresAt> = this.newAuthRequest.asObservable();

  constructor(private http: HttpService, private authService: AuthService) {}

  get<T>(endpoint: string, headers?: HttpHeader): Promise<AxiosResponse<T>> {
    const observable: Observable<AxiosResponse<T>> = defer(async () => {
      const { client_id, access_token } = await this.refreshTokenIfNeeded();
      await this.fetchKeepAlive()

      const _headers = {
        ...this.createAuthHeaders(client_id, access_token),
        ...headers,
      };

      return this.http.get<T>(endpoint, _headers)
        .catch(error => {
          switch (error.response.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.setAuthenticated(false);
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
            break;
            default:
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
          }
        })
    });

    return firstValueFrom(observable);
  }

  post<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader,
  ): Promise<AxiosResponse<T>> {
    const observable: Observable<AxiosResponse<T>> = defer(async () => {
      const { client_id, access_token } = await this.refreshTokenIfNeeded();
      await this.fetchKeepAlive()

      const _headers = {
        ...this.createAuthHeaders(client_id, access_token),
        ...headers,
      };

      return this.http.post<T>(endpoint, body, _headers)
        .catch(error => {
          switch (error.response.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.setAuthenticated(false);
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
            break;
            default:
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
          }
        })
    });

    return firstValueFrom(observable);
  }

  put<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader,
  ): Promise<AxiosResponse<T>> {
    const observable: Observable<AxiosResponse<T>> = defer(async () => {
      const { client_id, access_token } = await this.refreshTokenIfNeeded();
      await this.fetchKeepAlive()

      const _headers = {
        ...this.createAuthHeaders(client_id, access_token),
        ...headers,
      };

      return this.http.put<T>(endpoint, body, _headers)
        .catch(error => {
          switch (error.response.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.setAuthenticated(false);
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
            break;
            default:
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
          }
        })
    });

    return firstValueFrom(observable);
  }

  patch<T>(
    endpoint: string,
    body?: HttpBody,
    headers?: HttpHeader,
  ): Promise<AxiosResponse<T>> {
    const observable: Observable<AxiosResponse<T>> = defer(async () => {
      const { client_id, access_token } = await this.refreshTokenIfNeeded();
      await this.fetchKeepAlive()

      const _headers = {
        ...this.createAuthHeaders(client_id, access_token),
        ...headers,
      };

      return this.http.patch<T>(endpoint, body, _headers)
        .catch(error => {
          switch (error.response.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.setAuthenticated(false);
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
            break;
            default:
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
          }
        })
    });

    return firstValueFrom(observable);
  }

  delete(endpoint: string, headers?: HttpHeader): Promise<AxiosResponse> {
    const observable: Observable<AxiosResponse> = defer(async () => {
      const { client_id, access_token } = await this.refreshTokenIfNeeded();
      await this.fetchKeepAlive()

      const _headers = {
        ...this.createAuthHeaders(client_id, access_token),
        ...headers,
      };

      return this.http.delete(endpoint, _headers)
        .catch(error => {
          switch (error.response.status) {
            case HttpStatusCode.UNAUTHORIZED:
              this.authService.setAuthenticated(false);
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
            break;
            default:
              return new Promise<any>((resolve, reject) => {
                return reject(error);
              });
          }
        })
    });

    return firstValueFrom(observable);
  }

  private refreshTokenIfNeeded(): Promise<{
    client_id: string;
    access_token: string;
  }> {
    return new Promise(async (resolve, reject) => {
      const tokenPending = this.isFetchingAcessToken;
      const userIsAuthenticated = this.authService.isAuthenticated();
      if (!tokenPending && userIsAuthenticated) {
        // 1. Check if token needs a refresh
        if (!this.authService.isTokenValid()) {
          // 2. Refresh token
          try {
            this.isFetchingAcessToken = true;
            const accesTokenModel = await this.authService.refreshToken();
            this.isFetchingAcessToken = false;
            resolve({
              client_id: accesTokenModel.client_id,
              access_token: accesTokenModel.access_token,
            });
          } catch (error) {
            this.isFetchingAcessToken = false;
            console.log("Error refreshTokenIfNeeded;");
            reject(error);
          }
        } else {
          resolve({
            client_id: this.authService.getClientId(),
            access_token: this.authService.getAccessToken(),
          });
        }
      } else {
        return this.tokenIdle().then(() => {
          return resolve({
            client_id: this.authService.getClientId(),
            access_token: this.authService.getAccessToken(),
          });
        });
      }
    });
  }

  private fetchKeepAlive(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        if(this.isKeepAlivePending || !this.authService.isKeepAliveNeeded()){
          resolve();
        }
        else {
          this.isKeepAlivePending = true;
          await this.authService.keepAlive();
          this.isKeepAlivePending = false;

          this.newAuthRequest.next(this.authService.getSessionExpiresAt());
          resolve();
        }
      } catch (error) {
        console.log("Error fetchKeepAlive;");
        reject(error);
      }
    })
  }

  private tokenIdle = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tokenPending = this.isFetchingAcessToken;
        if (!tokenPending) {
          return resolve();
        } else {
          return this.tokenIdle().then(() => resolve());
        }
      }, 250);
    });
  };

  private createAuthHeaders(
    client_id: string,
    access_token: string
  ): BaseAuthHttpHeader {
    const baseAuthHttpHeader: BaseAuthHttpHeader = {
      Authorization: `Bearer ${access_token}`,
      "X-IBM-Client-Id": client_id,
    };

    return baseAuthHttpHeader;
  }
}
