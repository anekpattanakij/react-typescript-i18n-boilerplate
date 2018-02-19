export default class Error {
    constructor(code: string, message: string) {
        this.code = code;
        this.message = message;
    }
    readonly code: string;
    readonly message: string;
}
