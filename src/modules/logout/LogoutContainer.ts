import { connect } from 'react-redux';
import { State } from '../../redux/reducer';
import { logoutUser } from '../login/UserReducer';
import { translate } from 'react-i18next';
import LogoutView, {
  ILogoutState,
  ILogoutDispatch,
  ILogoutProps,
} from './LogoutView';

const stateToProps = (state: State): ILogoutState => ({
  user: state.user.user,
  loading: state.user.loading,
  errorList:  state.user.errorList,
});

export default translate('common', { wait: false })(
  connect < ILogoutState,
  ILogoutDispatch,
  ILogoutProps > (stateToProps, {
    logoutUser,
  })(LogoutView),
);
