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

export interface ILandingAuthState {
  user: User;
}


export type ILandingAuthProps = IProps &
  ILandingAuthState &
  RouteComponentProps<undefined>;

class LandingAuthViewClass extends React.PureComponent<ILandingAuthProps> {

  render() {
    const user: User = this.props.user;
    const t = this.props.t;
    return (
      <div>
        <Helmet>
          <title>Landing After Login Page</title>
        </Helmet>
        Welcome, {user.userid}
      </div>
    );
  }
}

export default LandingAuthViewClass;
