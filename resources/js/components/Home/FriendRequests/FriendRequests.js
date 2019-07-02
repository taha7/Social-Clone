import React from 'react';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../actions/HomeActions/FriendRequestsActions';

class FriendRequests extends React.Component {
	componentDidMount() {
		this.props.loadFriendRequests();
	}

	render() {
		return (
			<div className='col-md-3'>
				<div className='card' style={{ minHeight: 580 }}>
					<div className='card-header'> Friend Requests </div>
					<ul className='list-group' style={{ flex: 1 }}>
						{this.props.friendRequests.map(friend => (
							<li className='list-group-item' key={friend.id}>
								{friend.name}
							</li>
						))}
					</ul>
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
