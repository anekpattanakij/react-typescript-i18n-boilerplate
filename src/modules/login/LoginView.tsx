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
import { json } from 'express';

interface IProps {
  t(x: string): string;
  userid:string;
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

interface IState {  
    username: string;
}

class LoginViewClass extends React.PureComponent<ILoginProps> {
  public state: IState;
  
  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.loginUser( this.state['username']);
  }

  handleChange = (e: React.FormEvent<any>) => {
    if (e.target instanceof HTMLInputElement) {
      const nameInput = e.target.name;
      const valueInput = e.target.value;
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
          <Redirect to="/th/landingAuth" />
        }
        <input
          placeholder="Username"
          name="username"
          value={this.props.userid}
          onChange={this.handleChange}
        />
         <div style={{ textAlign: 'center' }}>
          <button className="btn" onClick={this.handleSubmit}> Login </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to={`/th`}>Click here to redirect to main page</Link> <br/>
          <Link to={`/th/members`}>Click here to members page</Link>
        </div>
      </div>
    );
  }
}

export default LoginViewClass;
