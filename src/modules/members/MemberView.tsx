import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Member from '../../common/Member';
import Loader from '../../components/Loader';

export interface IMemberState {
  members: Member[];
  loading: boolean;
}

export interface IMemberDispatch {

}

export type IMemberProps = IMemberState &
IMemberDispatch &
  RouteComponentProps<undefined>;

const MemberView: React.StatelessComponent<IMemberProps> = ({
  members,
  loading,
}) => (
  <div>
    <Helmet>
      <title>Member Page</title>
    </Helmet>
    {loading && <Loader />}
    This page is getting data from API server
  </div>
);

export default MemberView;
