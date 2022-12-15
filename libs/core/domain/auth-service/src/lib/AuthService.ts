import { AccessTokenResponseModel } from "./Session/model/response/AccessTokenResponseModel";
import { KeepAliveResponseModel } from "./Session/model/response/KeepAliveResponseModel";
import {
  SessionInterfaceService,
  AccessTokenResponseModelMetadata,
  KeepAliveResponseModelMetadata
} from "./Session/SessionInterfaceService";

import { BehaviorSubject, Observable } from "rxjs";

const KEEP_ALIVE_SLEEP_TIME = 10; // seconds

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// AccessTokenModel
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let access_token: string = "";
let client_id: string = "";
let token_type: string = "";
let scope: string = "";
let expires_in: number = 0;
let tokenExpiresAt: number = 0;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// KeepAliveModel
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let lastKeepAliveStartedAt: number = 0;
let sessionExpiresAt: number;

export class AuthService {
  private authenticateState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // as forcedLogout
  public authenticateState$: Observable<boolean> = this.authenticateState.asObservable();

  constructor(private sessionRepository: SessionInterfaceService) {}

  login(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const {metadata, responseModel} = await this.sessionRepository.accessToken();

      if(metadata === AccessTokenResponseModelMetadata.OK){
        this.setAuthenticated(true);
        this.setAccessTokenModel(responseModel);
        resolve();
        return;
      }
      else{
        this.setAuthenticated(false);
        reject();
        return
      }
    });
  }

  logout(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.sessionRepository.logout();
        this.setAuthenticated(false);
        this.clearAccessTokenModel();
        resolve();
      } catch (error) {
        this.setAuthenticated(false);
        this.clearAccessTokenModel();
        reject(error);
      }
    });
  }

  refreshToken(): Promise<AccessTokenResponseModel> {
    return new Promise(async (resolve, reject) => {
      const {metadata, responseModel} = await this.sessionRepository.accessToken()

      if(metadata === AccessTokenResponseModelMetadata.OK){
        this.setAccessTokenModel(responseModel);
        resolve(responseModel);
        return;
      }
      else{
        this.setAuthenticated(false);
        reject();
        return
      }
    });
  }

  keepAlive(): Promise<void>{
    return new Promise(async (resolve, reject) => {
      const {metadata, responseModel} = await this.sessionRepository.keepAlive();

      if(metadata === KeepAliveResponseModelMetadata.OK){
        this.setKeepAliveModel(responseModel);
        resolve();
        return;
      }
      else{
        this.setAuthenticated(false);
        reject();
        return
      }
    });
  }

  setAuthenticated(value: boolean): void{
    this.authenticateState.next(value);
  }

  isAuthenticated(): boolean {
    return this.authenticateState.value;
  }

  isTokenValid(): Promise<boolean> {
    if (access_token && !this.isTokenExpired(tokenExpiresAt)) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  isKeepAliveNeeded(): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp > lastKeepAliveStartedAt + KEEP_ALIVE_SLEEP_TIME;
  }

  private isTokenExpired(timestamp_token_expiration: number) {
    const SECONDS_BEFORE_REFRESHMENT = 10;
    return (
      timestamp_token_expiration <
      Date.now() + SECONDS_BEFORE_REFRESHMENT * 1000
    );
  }

  private setAccessTokenModel(model: AccessTokenResponseModel): void {
    access_token = model.access_token;
    client_id = model.client_id;
    token_type = model.token_type;
    expires_in = model.expires_in;
    scope = model.scope;

    tokenExpiresAt = Date.now() + expires_in * 1000;
  }

  private clearAccessTokenModel(): void {
    access_token = "";
    token_type = "";
    client_id = "";
    expires_in = 0;
    scope = "";

    tokenExpiresAt = 0;
  }

  getAccessToken(): string {
    return access_token;
  }

  getClientId(): string {
    return client_id;
  }

  private setKeepAliveModel(model: KeepAliveResponseModel): void {
    lastKeepAliveStartedAt = Math.floor(Date.now() / 1000);
    sessionExpiresAt = Date.now() + model.session_expires_in * 1000;
  }

  getSessionExpiresAt(): number {
    return sessionExpiresAt;
  }
}
