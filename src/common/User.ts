export default class User {
    constructor(userid: string, logonStatus:boolean = false) {
        this.userid = userid;
        this.logonStatus = logonStatus;
    }
    readonly userid: string;
    readonly logonStatus: boolean;
}
