import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import HeaderContainer from './header/HeaderContainer';
import IndexContainer from './index/IndexContainer';
import PageNotFound from '../components/PageNotFound';
import routes from '../routes/routes';
import LanguageDetectorPage from './languageDetector/languageDetectorView';
import * as _ from 'lodash';

export type IAppViewProps = RouteComponentProps<undefined>;

const AppView: React.StatelessComponent<IAppViewProps> = () => {
  const RouteWithSubRoutes = (route: any): React.ReactElement<typeof Route> => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );
  // Append Language Detector
  routes.push({
    path: '/:lng',
    component: LanguageDetectorPage,
    params: {
      name: 'lng',
    },
  });
  return (
    <div className="app-base">
      <HeaderContainer {...this.props} />
      <Switch>{routes.map(route => RouteWithSubRoutes(route))}</Switch>
    </div>
  );
};
export default AppView;
