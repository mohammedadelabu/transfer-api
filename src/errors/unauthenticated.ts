import CustomAPIError from './customErrors'
import {StatusCodes} from 'http-status-codes'
class UnauthenticatedError extends CustomAPIError {
    statusCode: any;
    constructor(message:any){
        super(message);
        this.statusCode= StatusCodes.UNAUTHORIZED;
    };
};
export default UnauthenticatedError;