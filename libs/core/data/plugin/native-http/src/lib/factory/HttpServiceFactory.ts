
import { HttpInterfaceService } from "@native-http/HttpInterfaceService";
import { NativeCapHttp } from "@native-http/NativeCapHttp";


class HttpSinglentonFactory {
  private static instance: HttpInterfaceService;

  static getInstance(): HttpInterfaceService {
    if (!HttpSinglentonFactory.instance) {
      HttpSinglentonFactory.instance = new NativeCapHttp();
    }

    return HttpSinglentonFactory.instance;
  }
}

export { HttpSinglentonFactory as HttpFactory };
