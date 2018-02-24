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

export class LoginState {
    readonly user: User = null;
    readonly errorList: Array<Error> = [];
    readonly loading:boolean = false;
    readonly readyStatus: string = LOGIN_INITIAL;
}


export const loginRequesting = makeAction(LOGIN_REQUESTING)(() => ({ type: LOGIN_REQUESTING}));
export const loginSuccess = makeAction(LOGIN_SUCCESS)((userid) => ({ type: LOGIN_SUCCESS, payload:userid}));
export const loginFailure = makeAction(LOGIN_FAILURE)((errors) => ({ type: LOGIN_FAILURE, payload:errors }));

const sleep = (ms:number):Promise<any> =>{
    return new Promise(resolve => setTimeout(resolve, ms));
  };

export const loginUser = (userid:string) => {
    return async (dispatch: Dispatch<any>) => {
    dispatch(loginRequesting());
    await sleep(LOGIN_SLEEP_TIME);
    if (Math.random() > LOGIN_SUCCESS_CHANCE) {
        dispatch(loginSuccess(userid));
    } else {
        const errors:Array<Error> = [];
      const err:Error = new Error( 'ERR001', 'Logon Fail' );
      errors.push(err);
        dispatch(loginFailure(err));
    }
  };
};

export const dispatchList = { loginUser };

const LoginReducer = (state: LoginState = new LoginState(), action: Action): LoginState => {
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
    } else{
        return state;
    }
};

export default LoginReducer;
