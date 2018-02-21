import * as React from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';

export interface IContentDispatch {
  t(x: string): string;
}

export type IContentProps = IContentDispatch;

const ContentView: React.StatelessComponent<IContentProps> = ({ t }) => (
  <div>
    <Helmet>
      <title>Nested Title</title>
    </Helmet>
    <h4>Text from Translate : {t('content.text')}</h4>
  </div>
);

export default translate('common')(ContentView);
