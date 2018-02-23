import * as React from 'react';

export interface IMemberProps {
    readonly fullname: string;
    readonly nickname: string;
}

const MemberDisplay: React.StatelessComponent<IMemberProps> = ({ fullname, nickname }) => (
    <div>
        Full Name {fullname}, Nick name {nickname}
    </div>
);

export default MemberDisplay;
