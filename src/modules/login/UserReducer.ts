import { Action, Dispatch } from 'redux';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import User from '../../common/User';
import Error from '../../common/Error';

const LOGIN_SLEEP_TIME = 1000;
const LOGIN_SUCCESS_CHANCE = 0.5;

export const LOGIN_INITIAL = 'LOGIN_INITIAL';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_INITIAL = 'LOGOUT_INITIAL';
export const LOGOUT_REQUESTING = 'LOGOUT_REQUESTING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export class UserState {
  readonly user: User = new User('', false);
  readonly errorList: Array<Error> = [];
  readonly loading: boolean = false;
  readonly readyStatus: string = LOGIN_INITIAL;
}

export const loginRequesting = makeAction(LOGIN_REQUESTING)(() => ({
  type: LOGIN_REQUESTING,
}));
export const loginSuccess = makeAction(LOGIN_SUCCESS)(userid => ({
  type: LOGIN_SUCCESS,
  payload: userid,
}));
export const loginFailure = makeAction(LOGIN_FAILURE)(errors => ({
  type: LOGIN_FAILURE,
  payload: errors,
}));

export const logoutRequesting = makeAction(LOGOUT_REQUESTING)(() => ({
  type: LOGOUT_REQUESTING,
}));
export const logoutSuccess = makeAction(LOGOUT_SUCCESS)(userid => ({
  type: LOGOUT_SUCCESS,
  payload: userid,
}));
export const logoutFailure = makeAction(LOGOUT_FAILURE)(errors => ({
  type: LOGOUT_FAILURE,
  payload: errors,
}));

const sleep = (ms: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const loginUser = (userid: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loginRequesting());
    await sleep(LOGIN_SLEEP_TIME);
    if (Math.random() > LOGIN_SUCCESS_CHANCE) {
      const user = new User(userid, true);
      dispatch(loginSuccess(user));
    } else {
      const errors: Array<Error> = [];
      const err: Error = new Error('ERR001', 'Logon Fail');
      errors.push(err);
      dispatch(loginFailure(errors));
    }
  };
};

export const logoutUser = (userid: string, refreshToken: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loginRequesting());
    await sleep(LOGIN_SLEEP_TIME);
    if (Math.random() > LOGIN_SUCCESS_CHANCE) {
      const user = new User(userid, true);
      dispatch(loginSuccess(user));
    } else {
      const errors: Array<Error> = [];
      const err: Error = new Error('ERR001', 'Logon Fail');
      errors.push(err);
      dispatch(loginFailure(errors));
    }
  };
};

export const dispatchList = { loginUser, logoutUser };

const UserReducer = (
  state: UserState = new UserState(),
  action: Action,
): UserState => {
  if (isAction(action, loginRequesting)) {
    return {
      ...state,
      loading: true,
      readyStatus: LOGIN_REQUESTING,
    };
  } else if (isAction(action, loginSuccess)) {
    return {
      ...state,
      user: action.payload,
      loading: false,
      readyStatus: LOGIN_SUCCESS,
    };
  } else if (isAction(action, loginFailure)) {
    return {
      ...state,
      errorList: action.payload,
      loading: false,
      readyStatus: LOGIN_FAILURE,
    };
  } else if (isAction(action, logoutRequesting)) {
    return {
      ...state,
      loading: true,
      readyStatus: LOGOUT_REQUESTING,
    };
  } else if (isAction(action, logoutSuccess)) {
    return {
      ...state,
      user: action.payload,
      loading: false,
      readyStatus: LOGOUT_SUCCESS,
    };
  } else if (isAction(action, logoutFailure)) {
    return {
      ...state,
      errorList: action.payload,
      loading: false,
      readyStatus: LOGOUT_FAILURE,
    };
  } else {
    return state;
  }
};

export default UserReducer;
