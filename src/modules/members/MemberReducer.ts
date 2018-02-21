import { Action } from 'redux';
import axios from 'axios';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import Member from '../../common/Member';

const MEMBERS_API = 'https://my-json-server.typicode.com/anekpattanakij/react-typescript-i18n-boilerplate/members';

export const MEMBERS_INITIAL = 'MEMBERS_INITIAL';
export const MEMBERS_REQUESTING = 'MEMBERS_REQUESTING';
export const MEMBERS_SUCCESS = 'MEMBERS_SUCCESS';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

export class MemberState {
    readonly members: Member[] = [];
    readonly loading: boolean = false;
    readonly readyStatus: string = MEMBERS_INITIAL;
}


export const loadMembers = makeAction(MEMBERS_REQUESTING)(() => ({ type: MEMBERS_REQUESTING }));
export const loadMembersSuccess = makeAction(MEMBERS_SUCCESS)((members) => ({ type: MEMBERS_SUCCESS, payload:members}));
export const loadMembersFailure = makeAction(MEMBERS_FAILURE)((error) => ({ type: MEMBERS_FAILURE, payload:error }));

export const dispatchList = { loadMembers };

const loadMembersFromServer = () => {
    return axios.get(MEMBERS_API)
    .then((members) => {
        loadMembersSuccess(members);
    })
    .catch((error) => {
        loadMembersFailure(error);
    });
};

const MemberReducer = (state: MemberState = new MemberState(), action: Action): MemberState|Promise<any> => {
    if (isAction(action, loadMembers)) {
        return loadMembersFromServer();
    } else if (isAction(action, loadMembersSuccess)) {
        return {
            ...state,
            members: action.payload,
            loading: false,
        };
    } else if (isAction(action, loadMembersFailure)) {
        return {
            ...state,
            loading: false,
        };
    } else{
        return state;
    }
};

export default MemberReducer;
