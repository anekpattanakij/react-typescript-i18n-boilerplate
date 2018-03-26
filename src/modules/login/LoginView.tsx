import * as React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import User from '../../common/User';
import ErrorList from '../../components/ErrorList';
import Error from '../../common/Error';
import Loader from '../../components/Loader';
import { Dispatch } from 'redux';
import * as _ from 'lodash';
import LoginFormView from './LoginFormView';

interface IProps {
  t(x: string): string;
  userid: string;
  password: string;
}

export interface ILoginState {
  user: User;
  loading: boolean;
  errorList: Array<Error>;
}

export interface ILoginDispatch {
  loginUser(userid: string, password: string): (dispatch: Dispatch<any>) => any;
}

export type ILoginProps = IProps &
  ILoginState &
  ILoginDispatch &
  RouteComponentProps<undefined>;

class LoginViewClass extends React.PureComponent<ILoginProps> {
 
  render() {
    const user: User = this.props.user; 
    return (
      <div>
        {user.logonStatus && 
          <Redirect to="/th/landingAuth" /> 
        } 
        <ErrorList errorList={this.props.errorList} t={this.props.t}/>
        <LoginFormView {...this.props}/>
      </div>
    );
  }
}

export default LoginViewClass;
