import { connect } from 'react-redux';
import AppView, { IAppViewProps } from './AppView'; 

export default connect<{}, undefined, IAppViewProps>(() => ({}), null)(AppView);
