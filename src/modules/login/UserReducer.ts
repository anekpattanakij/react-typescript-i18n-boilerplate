import { Config } from './../../config/index';
import { Action, Dispatch } from 'redux';
import axios from 'axios';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import User from '../../common/User';
import Error from '../../common/Error';

const LOGIN_SLEEP_TIME = 1000;
const LOGIN_SUCCESS_CHANCE = 0.5;

const API_LOGIN_URL = Config.apiHost + ':' + Config.apiPort + '/login';

export const LOCAL_STORAGE_USERS = 'LOCAL_STORAGE_USERS';
export const LOCAL_STORAGE_LOGIN_STATE = 'LOCAL_STORAGE_LOGIN_STATE';
export const LOCAL_STORAGE_LOGOUT_STATE = 'LOCAL_STORAGE_LOGOUT_STATE';

export const LOGIN_INITIAL = 'LOGIN_INITIAL';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_INITIAL = 'LOGOUT_INITIAL';
export const LOGOUT_REQUESTING = 'LOGOUT_REQUESTING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const setInitializeUser = (): User => {
  let returnInitial: User;
  try {
    if (localStorage.getItem(LOCAL_STORAGE_USERS)) {
      returnInitial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS));
    }
  } catch (err) {
    // do nothing use initial value
  }
  if (!returnInitial) {
    returnInitial = new User();
  }
  return returnInitial;
};

export class UserState {
  readonly user: User = setInitializeUser();
  readonly errorList: Array<Error> = [];
  readonly loading: boolean = false;
  readonly readyStatus: string = localStorage.getItem(
    LOCAL_STORAGE_LOGIN_STATE,
  ) || LOGIN_INITIAL;
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

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loginRequesting());
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post(API_LOGIN_URL, {
        email,
        password,
      })
      .then(user => {
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        dispatch(loginFailure(error));
      });
  };
};

export const logoutUser = (userid: string, refreshToken: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(loginRequesting());
    await sleep(LOGIN_SLEEP_TIME);
    if (Math.random() > LOGIN_SUCCESS_CHANCE) {
      const user = new User();
      user.email = null;
      user.logonStatus = false;
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
