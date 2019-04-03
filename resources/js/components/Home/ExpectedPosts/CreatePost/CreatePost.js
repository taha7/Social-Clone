import React from 'react';
const CreatePost = (props) => {
	const hasError = (prop) => {
		return props.errors.hasOwnProperty(prop) && props.errors[prop].length > 0;
	};
	// const errorMess = (prop) => {
	// 	return hasError(prop) ? props.errors[prop][0] : null;
	// };
	return (
		<div className='card' style={{ marginBottom: '5px' }}>
			<div className='card-header'>Create Post</div>
			<div className='card-body d-flex' style={styles.textareaCard}>
				<textarea
					name='body'
					value={props.post.body}
					onChange={props.changed}
					className={'form-control ' + (hasError('body') ? 'is-invalid' : '')}
					placeholder='What&#39;s on your mind'
					rows='3'
				/>
			</div>
			<div className='form-group text-center'>
				<button className='btn btn-success' style={styles.postButton} onClick={props.postCreated}>
					Post
				</button>
			</div>
		</div>
	);
};
let styles = {
	textareaCard: {
		padding: '5px 10px'
	},
	postButton: {
		width: '80px'
	}
};
export default CreatePost;
