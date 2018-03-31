import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Member from '../../common/Member';
import Loader from '../../components/Loader';
import { Dispatch } from 'redux';
import MemberDisplay from '../../components/memberDisplay';
import * as _ from 'lodash';

export interface IMemberState {
  members: Array<Member>;
  loading: boolean;
}

export interface IMemberDispatch {
  loadMembers(): (dispatch: Dispatch<any>) => any;
}

// Use route component props when need to access to match props only, if not, it doesn't need to use
// This for example import only
export type IMemberProps = IMemberState &
  IMemberDispatch &
  RouteComponentProps<undefined>;

class MemberViewClass extends React.PureComponent<IMemberProps> {
  componentDidMount() {
    const { loadMembers } = this.props;
    loadMembers();
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

export default MemberViewClass;
