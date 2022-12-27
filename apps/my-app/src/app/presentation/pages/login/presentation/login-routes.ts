export const LOGIN_ROUTES = {
  LOGIN: '',
};

import { APP_ROUTES_GLOBAL } from "@my-app/presentation/app-routes";

const BASE = APP_ROUTES_GLOBAL.LOGIN;
export const LOGIN_ROUTES_GLOBAL = {
  LOGIN: `${BASE}${LOGIN_ROUTES.LOGIN}`,
};
