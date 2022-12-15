export interface AccessTokenResponseModel {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  client_id: string;
}

export interface SessionAccessResponseTokenModel {
  token_type: string;
  expires_in: number;
  scope: string;
}
