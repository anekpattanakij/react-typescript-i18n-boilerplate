import { connect } from 'react-redux';
import { State } from '../../redux/reducer';
import { translate } from 'react-i18next';
import { changeLanguage } from '../languageDetector/languageDetectorReducer';
import HeaderView, { IHeaderState, IHeaderDispatch, IHeaderProps } from './HeaderView';

export default translate('common',{wait:false})(connect<IHeaderState,IHeaderDispatch, IHeaderProps>(() => ({}), {
    changeLanguage,
})(HeaderView));
