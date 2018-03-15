import * as React from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Dispatch } from 'redux';
import './styles.scss';

interface IProps {
  t(x: string): string;
}


export interface IHeaderState {
}

export interface IHeaderDispatch {
}

export interface IHeaderDispatch {
  changeLanguage(newLanguage:string): (dispatch: Dispatch<any>) => any;
}

export type IHeaderProps = IProps & IHeaderState & IHeaderDispatch;

const HeaderView: React.StatelessComponent<IHeaderProps> = ({ t }) => (
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
        <button className="btn"> TH </button>
        <button className="btn"> EN </button>
      </nav>
    </div>
  </div>
);

export default translate('common')(HeaderView);
