
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as i18n from 'i18next';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { State } from '../../redux/reducer';
import Language from '../../common/Language';
import { Config } from '../../config';
import PageNotFound from '../../components/PageNotFound';
import routes from '../../routes/routes';
import { setLanguage } from './languageDetectorReducer';
import { RouteComponentProps } from 'react-router-dom';
// import changeUser from '../UserLogon/action';

interface IProps {
  match: { url:string, params:{ lng: string }};
}

export interface ILanguageDetectorState {
  language: string;
  readyStatus: string;
}

export interface ILanguageDetectorDispatch {
  setLanguage(n: string): void;
}

export type ILanguageDetectorProps = IProps & ILanguageDetectorState & ILanguageDetectorDispatch & RouteComponentProps<undefined>;

// const IndexView: React.StatelessComponent<IIndexProps> = ({ title, todos, loading, setTitle, saveTodo, setDone }) =>
class  LanguageDetector extends React.PureComponent<ILanguageDetectorProps> {
  componentDidMount() {
    this.props.setLanguage(i18n.language);
  }

  render() {
    const RouteWithSubRoutes = (url:string, lng: string , route:any): React.ReactElement<typeof Route> => {
      const childrenRoute = (
        <Route
          key={_.uniqueId()}
          exact={route.exact || false}
          path={`${url + route.path}`}
          render={props => (
            // Pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes || null} />
          )}
        />
      );
      return childrenRoute;
    };
    if ( i18n.language !== this.props.match.params.lng) {
      i18n.changeLanguage(this.props.match.params.lng);
    }
    if (Config.configSet.i18n.whitelist.indexOf(this.props.match.params.lng) <= -1) {
      // Not in the whitelist language redirect to not found
      return (
        <div>
          <Route
            component={PageNotFound}
          />
        </div>
      );
    }
    return (
      <div>
        <Switch>{routes.map(route => RouteWithSubRoutes(this.props.match.url, this.props.match.params.lng , route))}</Switch>
      </div>
    );
  }
}


const mapStateToProps = (state: State): ILanguageDetectorState => ({
  language: state.languageDetector.language,
  readyStatus: state.languageDetector.readyStatus,
});



export default connect<ILanguageDetectorState, ILanguageDetectorDispatch, ILanguageDetectorProps>(mapStateToProps, { setLanguage })(LanguageDetector);
