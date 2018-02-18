import * as React from 'react';
import { translate } from 'react-i18next';

export interface IContentDispatch {
    t(x: string): string;
}

export type IContentProps = IContentDispatch;

const ContentView:React.StatelessComponent<IContentProps>  = ({t}) =>
    <h4>Text from Translate : {t('content.text')}</h4>;

export default translate('common')(ContentView);

