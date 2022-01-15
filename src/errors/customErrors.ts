
class CustomAPIError extends Error {
    constructor(message:any){
        super(message);
    };
};
// const createCustomError = (msg:any, statusCode:any) => {
//     return new CustomAPIError(msg, statusCode);
// }
export default CustomAPIError;