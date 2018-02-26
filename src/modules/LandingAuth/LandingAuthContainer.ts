import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { State } from '../../redux/reducer';
import LandingAuthView,{ILandingAuthState, ILandingAuthProps } from './LandingAuthView';

const stateToProps = (state: State): ILandingAuthState => ({
    user: state.login.user,
});

export default translate('common',{wait:false})(connect<ILandingAuthState, ILandingAuthProps>(stateToProps)(LandingAuthView));
