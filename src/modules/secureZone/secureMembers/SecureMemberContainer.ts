import { connect } from 'react-redux';
import { State } from '../../../redux/reducer';
import { dispatchList } from './SecureMemberReducer';
import SecureMemberView, {
  ISecureMemberState,
  ISecureMemberDispatch,
  ISecureMemberProps,
} from './SecureMemberView';

const stateToProps = (state: State): ISecureMemberState => ({
  members: state.secureMember.members,
  loading: state.secureMember.loading,
});

export default  connect<
  ISecureMemberState,
  ISecureMemberDispatch
>(stateToProps, {
  ...dispatchList,
})(SecureMemberView);
