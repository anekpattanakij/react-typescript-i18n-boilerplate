import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { State } from '../../redux/reducer';
import { loginUser } from './UserReducer';
import LoginView,{ILoginState, ILoginDispatch, ILoginProps } from './LoginView';

const stateToProps = (state: State): ILoginState => ({
    user: state.user.user,
    loading: state.user.loading,
    errorList:  state.user.errorList,
});

export default translate('common',{wait:false})(connect<ILoginState, ILoginDispatch, ILoginProps>(stateToProps, {
    loginUser,
})(LoginView));
