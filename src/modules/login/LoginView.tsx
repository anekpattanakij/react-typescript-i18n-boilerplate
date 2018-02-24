import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import User from '../../common/User';
import Error from '../../common/Error';
import Loader from '../../components/Loader';
import { Dispatch } from 'redux';
import * as _ from 'lodash';

export interface ILoginState {
  user: User;
  loading: boolean;
}

export interface ILoginDispatch {
  loginUser(userid: string): (dispatch: Dispatch<any>) => any;
}

export type ILoginProps = ILoginState &
  ILoginDispatch &
  RouteComponentProps<undefined>;

class LoginViewClass extends React.PureComponent<ILoginProps> {
  render() {
    const user: User = this.props.user;
    const loading: boolean = this.props.loading;
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        asd
      </div>
    );
  }
}

export default LoginViewClass;
