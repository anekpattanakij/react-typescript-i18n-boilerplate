import { createStore, applyMiddleware, compose, Action } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer, { State } from './reducer';

// Below is a necessary hack to access __PRELOADED_STATE__ on the global window object
const preloadedState: State = (<any>window).__PRELOADED_STATE__;
delete (<any>window).__PRELOADED_STATE__;

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (history: History) =>
    createStore<State,Action<any>,{},{}>(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
    );

export default configureStore;
