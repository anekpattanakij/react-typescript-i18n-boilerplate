import User from './User';
import axios from 'axios';
import { Config } from './../config/index';
import { ERROR_CODE_ACCESS_EXPIRE, ERROR_CODE_REFRESH_EXPIRE } from './Error';

const API_REFRESH_TOKEN_URL =
  Config.apiHost + ':' + Config.apiPort + '/refreshToken';

export enum API_CALLING_METHOD {
  GET,
  POST,
}

const callingToApi = async (
  retryAble: boolean,
  user: User,
  apiUrl: string,
  method: API_CALLING_METHOD,
  dispatchForSuccess: any,
  dispatchForFailure: any,
  dispatchForSessionTimeout: any,
  data?: any,
): Promise<any> => {
  let callingMethod: string = 'get';
  if (method === API_CALLING_METHOD.POST) {
    callingMethod = 'post';
  }
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return axios({
    method: callingMethod,
    url: apiUrl,
    data,
    timeout: 6000,
    headers: {
      bearer: user.accessToken,
    },
  })
    .then(returnResult => {
      dispatchForSuccess(returnResult);
      // dispatch(loadMembersSuccess(members));
    })
    .catch(error => {
      // dispatch(loadMembersFailure(error));
      if( error.response ) {
      console.log(error.response.data.code);
      }  else 
      {
        console.log(error);
      }
      if (
        error.response && 
        error.response.data &&
        error.response.data.code === ERROR_CODE_ACCESS_EXPIRE
      ) {
        if (retryAble) {
          // Refresh Token First
          // If refresh access token succeed call API again
          const dispatchIfRefreshTokenSuccess = (newAccessToken:any) => {
            user.accessToken = newAccessToken.data.accessToken;
            callingToApi(
              false,
              user,
              apiUrl,
              method,
              dispatchForSuccess,
              dispatchForFailure,
              dispatchForSessionTimeout,
            );
          };
          // If refresh access token fail return error
          const dispatchIfRefreshTokenFailure = (error: any) => {
            dispatchForFailure(error);
          };
          callingToApi(
            false,
            user,
            API_REFRESH_TOKEN_URL,
            API_CALLING_METHOD.POST,
            dispatchIfRefreshTokenSuccess,
            dispatchIfRefreshTokenFailure,
            dispatchForSessionTimeout,
            user.toPlainObject(),
          );
        } else {
          dispatchForSessionTimeout();
        }
      } else {
        dispatchForFailure(error);
      }
    });
};

const callSecureApi = (
  user: User,
  apiUrl: string,
  method: API_CALLING_METHOD,
  dispatchForSuccess: any,
  dispatchForFauilure: any,
  dispatchForSessionTimeout: any,
): void => {
  callingToApi(
    true,
    user,
    apiUrl,
    method,
    dispatchForSuccess,
    dispatchForFauilure,
    dispatchForSessionTimeout,
  );
};

export { callSecureApi };
