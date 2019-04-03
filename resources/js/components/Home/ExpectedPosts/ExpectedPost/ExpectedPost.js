import React from 'react';
import moment from 'moment';
const ExpectedPost = (props) => {
	return (
		<div className='card' style={{ marginBottom: '5px' }}>
			<div className='card-header'>
				{props.post.user.name} Said: {moment(moment(props.post.created_at).format()).fromNow()}
			</div>
			<div className='card-body'>{props.post.body}</div>
		</div>
	);
};

export default ExpectedPost;
