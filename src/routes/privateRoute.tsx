import * as React from 'react';
import { connect } from 'react-redux';

import User from '../common/User';
import { LoginState } from '../modules/login/LoginReducer';

type Props = {
  auth: User,
  children: Node,
};

const PrivateRoute = ({ auth, children }: Props) => {
  if (auth.logonStatus) {
    return (
      <div>
        { children }
      </div>
    );
  }
  return (
    <div>
      You are not authrized!!
    </div>
  );
};

//(state: State): ILoginState => ({

const mapStateToProps = ({ user }: LoginState) => ({
  auth : user,
});

export default connect(mapStateToProps)(PrivateRoute);
