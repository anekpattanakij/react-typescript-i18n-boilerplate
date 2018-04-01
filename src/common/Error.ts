export const ERROR_CODE_REFRESH_EXPIRE:string = 'ERROR_CODE_REFRESH_EXPIRE';
export const ERROR_CODE_ACCESS_EXPIRE:string = 'ERROR_CODE_ACCESS_EXPIRE';

export default class Error {
    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
    readonly code: string;
    readonly message: string;
}
