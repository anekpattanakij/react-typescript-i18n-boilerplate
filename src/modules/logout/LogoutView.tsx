import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import Button from '../../components/Button';
import './styles.scss';

interface IProps {
  t(x: string): string;
}

export interface ILogoutState {}

export interface ILogoutDispatch {}

export interface ILogoutDispatch {
  logoutUser(
    userid: string,
    refreshToken: string,
  ): (dispatch: Dispatch<any>) => any;
}

export type ILogoutProps = IProps & ILogoutState & ILogoutDispatch;

class LogoutView extends React.PureComponent<ILogoutProps> {
  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    // this.props.loginUser( this.state['username'],this.state['password']);
  }

  render() {
    return (
      <button className="btn" onClick={this.handleSubmit}>
        {' '}
        Login{' '}
      </button>
    );
  }
}

export default LogoutView;
