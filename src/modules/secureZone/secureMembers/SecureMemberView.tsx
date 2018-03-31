import * as React from 'react';
import { Helmet } from 'react-helmet';
import Member from '../../../common/Member';
import User from '../../../common/User';
import Loader from '../../../components/Loader';
import { Dispatch } from 'redux';
import MemberDisplay from '../../../components/memberDisplay';
import * as _ from 'lodash';

export interface ISecureMemberState {
  user: User;
  members: Array<Member>;
  loading: boolean;
}

export interface ISecureMemberDispatch {
  loadMembers(user: User): (dispatch: Dispatch<any>) => any;
}

export type ISecureMemberProps = ISecureMemberState & ISecureMemberDispatch;

class SecureMemberViewClass extends React.PureComponent<ISecureMemberProps> {
  componentDidMount() {
    const { loadMembers } = this.props;
    loadMembers(this.props.user);
  }

  render() {
    const members: Array<Member> = this.props.members;
    const loading: boolean = this.props.loading;
    return (
      <div>
        <Helmet>
          <title>Member Page</title>
        </Helmet>
        {loading && <Loader />}
        This page is getting data from API server.
        {members.map(member => (
          <MemberDisplay
            key={_.uniqueId()}
            fullname={member.fullname}
            nickname={member.nickname}
          />
        ))}
      </div>
    );
  }
}

export default SecureMemberViewClass;
