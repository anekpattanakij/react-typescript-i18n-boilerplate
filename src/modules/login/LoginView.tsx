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

interface IState {
  username: string;
  password: string;
}

class LoginViewClass extends React.PureComponent<ILoginProps> {
  public state: IState;
  submit = (values: any): void => {
    // put JSON input to dispatch login
    try {
      this.props.loginUser(values.email, values.password);
    } catch (err) { 
      // display some error
    }
  }

  render() {
    const user: User = this.props.user; 
    return (
      <div>
        {user.logonStatus && 
          <Redirect to="/th/landingAuth" /> 
        } 
        <LoginFormView {...this.props}/>
      </div>
    );
  }
}

export default LoginViewClass;
