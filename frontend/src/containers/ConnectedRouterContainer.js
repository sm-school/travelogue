import { connect } from 'react-redux';
import ConnectedRouter from '../components/ConnectedRouter';

const getNextLocation = state =>{
	return state.nextLocation;
};
const mapStateToProps = state=>({
	nextLocation : getNextLocation(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(ConnectedRouter);
