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
import RegisterFormView from './RegisterFormView';

interface IProps {
  t(x: string): string;
  userid: string;
  password: string;
}

export interface IRegisterState {
  user: User;
  loading: boolean;
  errorList: Array<Error>;
}

export interface IRegisterDispatch {
  registerUser(
    userid: string,
    password: string,
    displayName: string,
  ): (dispatch: Dispatch<any>) => any;
}

export type IRegisterProps = IProps &
  IRegisterState &
  IRegisterDispatch &
  RouteComponentProps<undefined>;

class RegisterViewClass extends React.PureComponent<IRegisterProps> {
  render() {
    const user: User = this.props.user;
    return (
      <div>
        {user.logonStatus && <Redirect to="/th/landingAuth" />}
        <ErrorList errorList={this.props.errorList} t={this.props.t} />
        <RegisterFormView {...this.props} />
      </div>
    );
  }
}

export default RegisterViewClass;
