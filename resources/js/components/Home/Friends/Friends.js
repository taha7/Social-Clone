import React from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from '../../../actions/HomeActions/FriendsActions';
class Friends extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadMyFriends();
	}

	render() {
		return (
			<div className='col-md-2'>
				<div className='card' style={{ minHeight: 580 }}>
					<div className='card-header'> Friends </div>
					<ul className='list-group' style={{ flex: 1 }}>
						{this.props.friends.map(friend => (
							<li className='list-group-item' key={friend.id}>
								{friend.name}
							</li>
						))}
					</ul>
					<ul className='list-group'>
						<input
							type='text'
							placeholder='Search for a friend'
							style={{
								border: 'none',
								background: '#EEE',
								height: 50,
								padding: 10
							}}
						/>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		friends: state.FriendsReducer.friends
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
