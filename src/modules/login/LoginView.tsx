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

interface IProps {
  t(x: string): string;
}

export interface ILoginState {
  user: User;
  loading: boolean;
  errorList: Array<Error>;
}

export interface ILoginDispatch {
  loginUser(userid: string): (dispatch: Dispatch<any>) => any;
}

export type ILoginProps = IProps &
  ILoginState &
  ILoginDispatch &
  RouteComponentProps<undefined>;

class LoginViewClass extends React.PureComponent<ILoginProps> {

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const user: User = this.props.user;
    this.props.loginUser(user.userid);
  }

  handleChange = (e: React.FormEvent<any>) => {
    if (e.target instanceof HTMLInputElement) {
      const nameInput = e.target.name;
      const valueInput = e.target.value;
      //this.componentState[nameInput] = valueInput;
      this.setState({
        [nameInput]: valueInput,
      });
    }
  }

  render() {
    const user: User = this.props.user;
    const loading: boolean = this.props.loading;
    const errorList: Array<Error> = this.props.errorList;
    const t = this.props.t;
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <form onSubmit={this.handleSubmit}>
          {t('content.text')}
          <ErrorList errorList={errorList} t={t} />
        </form>
        {user.logonStatus &&
          <Redirect to="/LandingAuth" />
        }
        <input
          placeholder="Username"
          name="username"
          value={user.userid}
          onChange={this.handleChange}
        />
         <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={this.handleSubmit}> Login </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to={`/`}>Click here to redirect to main page</Link>
        </div>
      </div>
    );
  }
}

export default LoginViewClass;
