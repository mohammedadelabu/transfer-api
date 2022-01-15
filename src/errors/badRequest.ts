import CustomAPIError from './customErrors'
import {StatusCodes} from 'http-status-codes'
class BadRequest extends CustomAPIError {
    statusCode: any;
    constructor(message:any){
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    };
};
export default BadRequest