import { connect } from 'react-redux';
import { State } from '../../redux/reducer';
import { dispatchList } from './LoginReducer';
import LoginView,{ILoginState, ILoginDispatch, ILoginProps } from './LoginView';

const stateToProps = (state: State): ILoginState => ({
    user: state.login.user,
    loading: state.login.loading,
});

export default connect<ILoginState, ILoginDispatch, ILoginProps>(stateToProps, {
    ...dispatchList,
})(LoginView);
