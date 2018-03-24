import { LanguageDetector } from 'i18next-express-middleware';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer, RouterState } from 'react-router-redux';
import IndexReducer, { IndexEpics, IndexState } from '../modules/index/IndexReducer';
import LanguageDetectorReducer, { LanguageDetectorState } from '../modules/languageDetector/languageDetectorReducer';
import MemberReducer, { MemberState } from '../modules/members/MemberReducer';
import UserReducer, { UserState } from '../modules/login/UserReducer';

const reducer = combineReducers<State>({
    router: routerReducer,
    index: IndexReducer,
    languageDetector: LanguageDetectorReducer,
    member: MemberReducer,
    user: UserReducer,
});

export class State {
    readonly router: RouterState = null;
    readonly index: IndexState = new IndexState();
    readonly languageDetector: LanguageDetectorState = new LanguageDetectorState();
    readonly member: MemberState = new MemberState();
    readonly user: UserState = new UserState();
}

export const epics = combineEpics(IndexEpics);

export default reducer;
