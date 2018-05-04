export const ERROR_CODE_REFRESH_EXPIRE:string = 'ERROR_CODE_REFRESH_EXPIRE';
export const ERROR_CODE_ACCESS_EXPIRE:string = 'ERROR_CODE_ACCESS_EXPIRE';
export const ERROR_CODE_NETWORK_ERROR:string = 'ERROR_CODE_NETWORK_ERROR';

export default class Error {
    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
    readonly code: string;
    readonly message: string;

    public static transformErrorFromAxios(returnError:any):Error {
        if(!returnError.response || !returnError.response.data) {
            return new Error(ERROR_CODE_NETWORK_ERROR,'Network Error');
        } else {
            return returnError.response.data;
        }
    }
}
