import React from 'react';

const SearchResult = props => {
	function specifyRelation(user) {
		let relationOutput = null;
		if (user.sendStatus === 'pending') {
			relationOutput = <div>wait accept</div>;
		}
		else if (user.recieveStatus === 'pending') {
			relationOutput = <button>accept</button>;
		}
		else if (user.recieveStatus === 'friends' || user.sendStatus === 'friends') {
			relationOutput = <div>friends</div>;
		}
		else {
			relationOutput = (
				<button onClick={() => props.addUser(user.id)} className='btn btn-blue'>
					Add Friend <i className='fas fa-user-plus' />
				</button>
			);
		}
		return relationOutput;
	}

	let loadedResult = props.users ? (
		<ul className='list-group'>
			{props.users.map(user => (
				<li key={user.id} className='list-group-item d-flex justify-content-between align-items-center'>
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
