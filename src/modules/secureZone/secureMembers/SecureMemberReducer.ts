import { Config } from './../../../config/index';
import { Action, Dispatch } from 'redux';
import axios from 'axios';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../../redux/guards';
import Member from '../../../common/Member';

const MEMBERS_API =
  Config.apiHost + ':' + Config.apiPort + '/secureWithFuction';

export const LOCAL_STORAGE_SECURE_MEMBERS = 'LOCAL_STORAGE_SECURE_MEMBERS';
export const LOCAL_STORAGE_SECURE_MEMBERS_STATE =
  'LOCAL_STORAGE_SECURE_MEMBERS_STATE';

export const SECURE_MEMBERS_INITIAL = 'SECURE_MEMBERS_INITIAL';
export const SECURE_MEMBERS_REQUESTING = 'SECURE_MEMBERS_REQUESTING';
export const SECURE_MEMBERS_SUCCESS = 'SECURE_MEMBERS_SUCCESS';
export const SECURE_MEMBERS_FAILURE = 'SECURE_MEMBERS_FAILURE';

const setInitializeMembers = (): Array<Member> => {
  let returnInitial: Array<Member> = [];
  try {
    if (localStorage.getItem(LOCAL_STORAGE_SECURE_MEMBERS)) {
      returnInitial = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SECURE_MEMBERS),
      );
    }
  } catch (err) {
    // do nothing use initial value
  }
  return returnInitial;
};

export class SecureMemberState {
  readonly members: Array<Member> = setInitializeMembers();
  readonly loading: boolean = false;
  readonly readyStatus: string = localStorage.getItem(
    LOCAL_STORAGE_SECURE_MEMBERS_STATE,
  ) || SECURE_MEMBERS_INITIAL;
}

export const loadMembersRequesting = makeAction(SECURE_MEMBERS_REQUESTING)(
  () => ({
    type: SECURE_MEMBERS_REQUESTING,
  }),
);
export const loadMembersSuccess = makeAction(SECURE_MEMBERS_SUCCESS)(
  members => ({
    type: SECURE_MEMBERS_SUCCESS,
    payload: members.data,
  }),
);
export const loadMembersFailure = makeAction(SECURE_MEMBERS_FAILURE)(error => ({
  type: SECURE_MEMBERS_FAILURE,
  payload: error,
}));

export const loadMembers = (accessToken:String) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadMembersRequesting());
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios
      .get(MEMBERS_API, {
        timeout: 6000,
        headers: {
          bearer: accessToken,
        },
      })
      .then(members => {
        dispatch(loadMembersSuccess(members));
      })
      .catch(error => {
        dispatch(loadMembersFailure(error));
      });
  };
};

export const dispatchList = { loadMembers };

const SecureMemberReducer = (
  state: SecureMemberState = new SecureMemberState(),
  action: Action,
): SecureMemberState => {
  if (isAction(action, loadMembersRequesting)) {
    return {
      ...state,
      loading: true,
      readyStatus: SECURE_MEMBERS_REQUESTING,
    };
  } else if (isAction(action, loadMembersSuccess)) {
    localStorage.setItem(
      LOCAL_STORAGE_SECURE_MEMBERS,
      JSON.stringify(action.payload),
    );
    localStorage.setItem(
      LOCAL_STORAGE_SECURE_MEMBERS_STATE,
      SECURE_MEMBERS_SUCCESS,
    );
    return {
      ...state,
      members: action.payload,
      loading: false,
      readyStatus: SECURE_MEMBERS_SUCCESS,
    };
  } else if (isAction(action, loadMembersFailure)) {
    localStorage.setItem(
      LOCAL_STORAGE_SECURE_MEMBERS_STATE,
      SECURE_MEMBERS_FAILURE,
    );
    return {
      ...state,
      loading: false,
      readyStatus: SECURE_MEMBERS_FAILURE,
    };
  } else {
    return state;
  }
};

export default SecureMemberReducer;
