import * as React from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import './styles.scss';

interface IProps {
  t(x: string): string;
}

export interface IHeaderState {}

export interface IHeaderDispatch {}

export interface IHeaderDispatch {}

export type IHeaderProps = IProps & IHeaderState & IHeaderDispatch;

class HeaderView extends React.PureComponent<
  RouteComponentProps<{}> & IHeaderProps
> {
  render() {
    return (
      <div className="blog-masthead">
        <div className="container">
          <nav className="blog-nav">
            <a className="blog-nav-item active" href="#">
              Home
            </a>
            <a className="blog-nav-item" href="#">
              New features
            </a>
            <a className="blog-nav-item" href="#">
              Press
            </a>
            <a className="blog-nav-item" href="#">
              New hires
            </a>
            <a className="blog-nav-item" href="#">
              About
            </a>
            <Link to="/th/content" replace>
              TH
            </Link>
            <Link to="/en/content" replace>
              EN
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderView);
