import * as React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { State } from '../redux/reducer';

import User from '../common/User';
import { LoginState } from '../modules/login/LoginReducer';

type Props = {
  key:any,
  children: any,
};

interface IPrivateRouteState {
  auth: User;
}

const PrivateRoute = ({ auth, children}: Props&IPrivateRouteState) => {
  if (auth.logonStatus) {
    return (
      <div>
        { children }
      </div>
    );
  }
  return (
    <div>
      You are not authroized!!
    </div>
  );
};

const stateToProps = (state: State): IPrivateRouteState => ({
  auth: state.login.user,
});


export default connect(stateToProps)(PrivateRoute);

