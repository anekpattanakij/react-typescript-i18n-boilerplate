import { Action, Dispatch } from 'redux';
import axios from 'axios';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import Member from '../../common/Member';

const MEMBERS_API =
  'https://my-json-server.typicode.com/anekpattanakij/react-typescript-i18n-boilerplate/members';

export const LOCAL_STORAGE_MEMBERS = 'LOCAL_STORAGE_MEMBERS';
export const LOCAL_STORAGE_MEMBERS_STATE = 'LOCAL_STORAGE_MEMBERS_STATE';

export const MEMBERS_INITIAL = 'MEMBERS_INITIAL';
export const MEMBERS_REQUESTING = 'MEMBERS_REQUESTING';
export const MEMBERS_SUCCESS = 'MEMBERS_SUCCESS';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

const setInitializeMembers = (): Array<Member> => {
  let returnInitial: Array<Member> = [];
  try {
    if (localStorage.getItem(LOCAL_STORAGE_MEMBERS)) {
      returnInitial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MEMBERS));
    }
  } catch (err) {
    // do nothing use initial value
  }
  return returnInitial;
};

export class MemberState {
  readonly members: Array<Member> = setInitializeMembers();
  readonly loading: boolean = false;
  readonly readyStatus: string = localStorage.getItem(LOCAL_STORAGE_MEMBERS_STATE) || MEMBERS_INITIAL;
}

export const loadMembersRequesting = makeAction(MEMBERS_REQUESTING)(() => ({
  type: MEMBERS_REQUESTING,
}));
export const loadMembersSuccess = makeAction(MEMBERS_SUCCESS)(members => ({
  type: MEMBERS_SUCCESS,
  payload: members.data,
}));
export const loadMembersFailure = makeAction(MEMBERS_FAILURE)(error => ({
  type: MEMBERS_FAILURE,
  payload: error,
}));

export const loadMembers = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadMembersRequesting());
    axios
      .get(MEMBERS_API)
      .then(members => {
        dispatch(loadMembersSuccess(members));
      })
      .catch(error => {
        dispatch(loadMembersFailure(error));
      });
  };
};

export const dispatchList = { loadMembers };

const MemberReducer = (
  state: MemberState = new MemberState(),
  action: Action,
): MemberState => {
  if (isAction(action, loadMembersRequesting)) {
    return {
      ...state,
      loading: true,
      readyStatus: MEMBERS_REQUESTING,
    };
  } else if (isAction(action, loadMembersSuccess)) {
    localStorage.setItem(LOCAL_STORAGE_MEMBERS,JSON.stringify(action.payload));
    localStorage.setItem(LOCAL_STORAGE_MEMBERS_STATE,MEMBERS_SUCCESS);
    return {
      ...state,
      members: action.payload,
      loading: false,
      readyStatus: MEMBERS_SUCCESS,
    };
  } else if (isAction(action, loadMembersFailure)) {
    localStorage.setItem(LOCAL_STORAGE_MEMBERS_STATE,MEMBERS_FAILURE);
    return {
      ...state,
      loading: false,
      readyStatus: MEMBERS_FAILURE,
    };
  } else {
    return state;
  }
};

export default MemberReducer;
