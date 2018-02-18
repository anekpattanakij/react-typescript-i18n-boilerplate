import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer as HotContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import configureStore from './redux/store';
import AppContainer from './modules/AppContainer';
import './styles/styles.scss';
import i18n from './i18n/i18n-client';
import { I18nextProvider } from 'react-i18next';

const history = createHistory();

const render = (container: React.ComponentClass) =>
    ReactDOM.render(
        <HotContainer>
            <I18nextProvider i18n={i18n}>
              <Provider store={configureStore(history)}>
                  <ConnectedRouter history={history}>
                      <Route component={container} />
                  </ConnectedRouter>
              </Provider>
            </I18nextProvider>
        </HotContainer>,
        document.getElementById('app'),
    );

render(AppContainer);

if ((module as any).hot) {
    (module as any).hot.accept('./modules/AppContainer', () => render(AppContainer));
}
