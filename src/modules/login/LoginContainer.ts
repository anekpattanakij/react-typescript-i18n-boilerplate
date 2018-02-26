import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { State } from '../../redux/reducer';
import { dispatchList } from './LoginReducer';
import LoginView,{ILoginState, ILoginDispatch, ILoginProps } from './LoginView';

const stateToProps = (state: State): ILoginState => ({
    user: state.login.user,
    loading: state.login.loading,
    errorList:  state.login.errorList,
});

export default translate('common',{wait:false})(connect<ILoginState, ILoginDispatch, ILoginProps>(stateToProps, {
    ...dispatchList,
})(LoginView));
