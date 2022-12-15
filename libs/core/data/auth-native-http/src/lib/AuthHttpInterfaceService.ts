import { HttpInterfaceService } from "@ionic-arch/core/data/native-http";

import { Observable } from 'rxjs';
import { ExpiresAt } from "./model/ExpiresAt";

export interface AuthHttpInterfaceService extends HttpInterfaceService {
  newAuthRequest$: Observable<ExpiresAt>
}
