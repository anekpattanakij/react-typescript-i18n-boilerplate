/* @flow */

import type {
    Dispatch,
    ThunkAction,
  } from '../../types';
  
    // Export this for unit testing more easily
  export default (language: string) : ThunkAction =>
    async (dispatch: Dispatch) => {
      dispatch({ type: 'LANGUAGE_CHANGE', language });
    };
  