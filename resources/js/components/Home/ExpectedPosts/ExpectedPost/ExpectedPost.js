import React from 'react';
import moment from 'moment';
const ExpectedPost = props => {
	return (
		<div className='card' style={{ marginBottom: '5px' }}>
			<div className='card-header'>
				<div className='d-flex'>
					<div>
						{props.post.user.name}
						<a
							href={laroute.route('posts.show', { post: props.post.id })}
							className='ml-2'
						>
							{moment(moment(props.post.created_at).format()).fromNow()}
						</a>
					</div>
					<div className='ml-auto'>
						<div className='dropdown'>
							<button
								className='btn dropdown-toggle'
								type='button'
								id='dropdownMenuButton'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								<i className='fas fa-ellipsis-h' />
							</button>
							<div
								className='dropdown-menu'
								aria-labelledby='dropdownMenuButton'
							>
								{window.App.user.id === props.post.user.id ? (
									<a
										className='dropdown-item'
										href='javascript:0'
										onClick={props.deletePost}
									>
										<i className='far fa-trash-alt' />{' '}
										Delete Post
									</a>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='card-body'>{props.post.body}</div>
		</div>
	);
};

export default ExpectedPost;
