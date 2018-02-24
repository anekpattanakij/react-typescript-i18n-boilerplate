import * as React from 'react';
import Error from '../../common/Error';

export interface IErrorItemProps {
    readonly error: Error;
    t: (x: string) => string;
}

const ErrorItem: React.StatelessComponent<IErrorItemProps> = ({ error, t }) => (
    <div>
    {t(`error.${error.code}`)}
  </div>
);

export default ErrorItem;
