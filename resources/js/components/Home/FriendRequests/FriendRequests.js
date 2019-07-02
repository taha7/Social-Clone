import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions/HomeActions/FriendRequestsActions';

class FriendRequests extends React.Component {
	render() {
		return (
			<div className='col-md-3'>
				<div className='card'>
					<div className='card-header'>Friend Requests</div>
					<div className='card-body' />
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		friendRequests: state.FriendRequestsReducer.friendRequests
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);
