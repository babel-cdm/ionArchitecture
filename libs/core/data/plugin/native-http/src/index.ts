import { HttpFactory } from "./lib/factory/HttpServiceFactory";
import { HttpInterfaceService } from "./lib/HttpInterfaceService"; 
import { HttpErrorResponse, HttpSuccessResponse } from "./lib/model/response/HttpResponseModel";

export { 
    HttpInterfaceService,
    HttpErrorResponse, 
    HttpSuccessResponse
}; 
export default HttpFactory.getInstance();