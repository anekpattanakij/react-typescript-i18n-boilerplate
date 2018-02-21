export default class Member {
    constructor(nickname: string, fullname: string) {
        this.nickname = nickname;
        this.fullname = fullname;
    }
    readonly nickname: string;
    readonly fullname: string;
}
