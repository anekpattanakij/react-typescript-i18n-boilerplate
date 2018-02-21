import { Action } from 'redux';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import Member from '../../common/Member';

export const MEMBERS_INITIAL = 'MEMBERS_INITIAL';
export const MEMBERS_LOADING = 'MEMBERS_LOADING';
export const MEMBERS_LOAD_SUCCESS = 'MEMBERS_LOAD_SUCCESS';

export class MemberState {
    readonly members: Member[] = [];
    readonly readyStatus: string = MEMBERS_INITIAL;
}


export const loadMembers = makeAction(MEMBERS_LOADING)(() => ({ type: MEMBERS_LOADING }));

const MemberReducer = (state: MemberState = new MemberState(), action: Action): MemberState => {
    if (isAction(action, loadMembers)) {
        return { ...state, readyStatus: MEMBERS_LOADING};
    } else {
        return state;
    }
};

export default MemberReducer;
