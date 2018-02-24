import * as React from 'react';
import * as _ from 'lodash';
import ErrorItem from '../ErrorItem';
import Error from '../../common/Error';

export interface IErrorListProps {
  errorList: Array<Error>;
  t: (x: string) => string;
}

const ErrorList: React.StatelessComponent<IErrorListProps> = ({
  errorList,
  t,
}) => (
  <div>
    {errorList.map(element => (
      <ErrorItem key={_.uniqueId()} error={element} t={t} />
    ))}
  </div>
);

export default ErrorList;
