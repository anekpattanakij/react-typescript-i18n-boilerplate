import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { State } from '../../redux/reducer';
import { registerUser } from '../login/UserReducer';
import RegisterView, {
  IRegisterState,
  IRegisterDispatch,
  IRegisterProps,
} from './RegisterView';

const stateToProps = (state: State): IRegisterState => ({
  user: state.user.user,
  loading: state.user.loading,
  errorList: state.user.errorList,
});

export default translate('common', { wait: false })(
  connect<IRegisterState, IRegisterDispatch, IRegisterProps>(stateToProps, {
    registerUser,
  })(RegisterView),
);
