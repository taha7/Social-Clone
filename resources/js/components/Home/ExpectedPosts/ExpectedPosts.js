import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import ExpectedPost from './ExpectedPost/ExpectedPost';
import mapDispatchToProps from '../../../actions/HomeActions/ExpectedPostsActions';
import CreatePost from './CreatePost/CreatePost';

class ExpectedPosts extends Component {
	componentDidMount() {
		/** @description load all expects posts */
		this.props.loadExpectedPosts();
	}

	/** @description returns sweet alert */
	renderAlert() {
		return (
			<SweetAlert
				success
				timeout={2000}
				title='The post has been published'
				onConfirm={() => this.props.onHideAlert()}
			/>
		);
	}

	render() {
		return (
			<div className='col-md-5'>
				{/* render alert if a new post created */}
				{this.props.isPostCreated ? this.renderAlert() : null}
				{/* create a new post */}
				<CreatePost
					changed={(e) => this.props.onChangeInput(e)}
					postCreated={() => this.props.createExpectedPost(this.props.newPost)}
					post={this.props.newPost}
				/>
				{/* all expected posts */}
				{this.props.posts.map((post) => <ExpectedPost key={post.id} post={post} />)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.ExpectedPostsReducer.posts,
		newPost: state.ExpectedPostsReducer.newPost,
		isPostCreated: state.ExpectedPostsReducer.postCreated
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpectedPosts);
