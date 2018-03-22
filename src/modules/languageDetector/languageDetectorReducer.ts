import { Action, Dispatch } from 'redux';
import * as _ from 'lodash';
import { makeAction, isAction } from '../../redux/guards';
import Language from '../../common/Language';
import { Config } from '../../config';

export const CHANGE_LANGUAGE:string = 'LANGUAGE_CHANGE';

export class LanguageDetectorState {
    readonly language: string = Config.i18n.fallbackLng[0];
    readonly readyStatus: string = CHANGE_LANGUAGE;
}


export const setLanguage = makeAction(CHANGE_LANGUAGE)((language: string) => ({ type: CHANGE_LANGUAGE, payload: language }));

const LanguageDetectorReducer = (state: LanguageDetectorState = new LanguageDetectorState(), action: Action): LanguageDetectorState => {
    if (isAction(action, setLanguage)) {
        return { ...state, language: action.payload, readyStatus: CHANGE_LANGUAGE};
    } else {
        return state;
    }
};

export const changeLanguage = (newLanguage:string) => {
    return async (dispatch: Dispatch<any>) => {
      return dispatch(setLanguage(newLanguage));
    };
};

export default LanguageDetectorReducer;
