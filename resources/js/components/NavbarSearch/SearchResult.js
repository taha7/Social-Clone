import React from 'react';
import Wrap from '../../hoc/Wrap';

const SearchResult = props => {
	function specifyRelation(user) {
		let relationOutput = null;
		if (window.App.user.id == user.id) {
			relationOutput = <div>Profile</div>;
		}
		else if (user.sendStatus === 'pending') {
			relationOutput = (
				<Wrap>
					<button onClick={() => props.acceptFriend(user.id)}>accept</button>{' '}
					<button onClick={() => props.removeFriendRequest(user.id)}>
						Remove Request
					</button>
				</Wrap>
			);
		}
		else if (user.recieveStatus === 'pending') {
			relationOutput = (
				<Wrap>
					<div>wait accept</div>
					<button onClick={() => props.removeFriendRequest(user.id)}>
						Cancel Request
					</button>
				</Wrap>
			);
		}
		else if (user.recieveStatus === 'friends' || user.sendStatus === 'friends') {
			relationOutput = <div>friends</div>;
		}
		else {
			relationOutput = (
				<button onClick={() => props.addFriend(user.id)} className='btn btn-blue'>
					Add Friend <i className='fas fa-user-plus' />
				</button>
			);
		}
		return relationOutput;
	}

	let loadedResult = props.users ? (
		<ul className='list-group'>
			{props.users.map(user => (
				<li
					key={user.id}
					className='list-group-item d-flex justify-content-between align-items-center'
				>
					{user.name}
					{specifyRelation(user)}
				</li>
			))}
		</ul>
	) : (
		props.children
	);
	return (
		<div className='search-result' id='search-result'>
			{loadedResult}
		</div>
	);
};

export default SearchResult;
