import React from 'react';
import { connect } from 'react-redux';

import mapDispatchToProps from '../../../actions/HomeActions/FriendsActions';
class Friends extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='col-md-2'>
				<div className='card'>
					<div className='card-header'> Friends </div>
					<ul className='list-group'>
						{this.props.friends.map(friend => (
							<li className='list-group-item'>{friend}</li>
						))}
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
