import { connect } from 'react-redux';
import { State } from '../../../redux/reducer';
import { dispatchList } from './SecureMemberReducer';
import Member from '../../../common/Member';
import MemberView, { IMemberState, IMemberDispatch, IMemberProps } from './SecureMemberView';

const stateToProps = (state: State): IMemberState => ({
    members: state.member.members,
    loading: state.member.loading,
});

export default connect<IMemberState, IMemberDispatch, IMemberProps>(stateToProps, {
    ...dispatchList,
})(MemberView);
