import React from 'react';
const CreatePost = (props) => {
	const hasError = (prop) => {
		return props.errors.hasOwnProperty(prop) && props.errors[prop].length > 0;
	};
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
				<input id='image' type='file' name='image' />
				<button className='btn btn-primary' style={styles.postButton} onClick={props.postCreated}>
					<i className='far fa-share-square' /> Share
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
		width: '100px'
	}
};
export default CreatePost;
