import User from './User';
import axios from 'axios';

export enum API_CALLING_METHOD {
  GET,
  POST,
}

const callSecureApi = (
  user: User,
  apiUrl: string,
  method: API_CALLING_METHOD,
  dispatchForSuccess: any,
  dispatchForFauilure: any,
) => {
  console.log('tes');
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios
    .get(apiUrl, {
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
      dispatchForFauilure(error);
      // dispatch(loadMembersFailure(error));
    });
};

export { callSecureApi };
