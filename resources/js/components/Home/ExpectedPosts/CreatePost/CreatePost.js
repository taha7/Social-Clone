import React from 'react';
const CreatePost = (props) => (
	<div className='card' style={{ marginBottom: '5px' }}>
		<div className='card-header'>Create Post</div>
		<div className='card-body d-flex' style={styles.textareaCard}>
			<textarea
				name='body'
				value={props.post.body}
				onChange={props.changed}
				style={styles.createPost}
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

let styles = {
	textareaCard: {
		padding: '5px 10px'
	},
	createPost: {
		borderRadius: '2px',
		flex: '1',
		resize: 'none',
		border: 'none',
		borderBottom: '1.5px solid #e5e5e5',
		padding: '5px',
		marginBottom: '10px'
	},
	postButton: {
		width: '80px'
	}
};
export default CreatePost;
