import { AccessTokenResponseModel } from "./model/response/AccessTokenResponseModel";
import { KeepAliveResponseModel } from "./model/response/KeepAliveResponseModel";

export type RepositoryResponseModel<T, M> = {
  metadata: T,
  responseModel: M
}

export enum AccessTokenResponseModelMetadata {
  OK = 'OK',
  GENERAL_ERROR = 'GENERAL_ERROR',
  FORCELOGOUT = 'FORCELOGOUT'
}

export enum KeepAliveResponseModelMetadata {
  OK = 'OK',
  GENERAL_ERROR = 'GENERAL_ERROR',
  FORCELOGOUT = 'FORCELOGOUT'
}

export enum LogoutResponseModelMetadata {
  OK = 'OK',
}

export abstract class SessionInterfaceService {
  public abstract accessToken()
    : Promise<RepositoryResponseModel<AccessTokenResponseModelMetadata, AccessTokenResponseModel>>;

  public abstract keepAlive()
    : Promise<RepositoryResponseModel<KeepAliveResponseModelMetadata, KeepAliveResponseModel>>;

  public abstract logout()
    : Promise<RepositoryResponseModel<LogoutResponseModelMetadata, void>>;
}
