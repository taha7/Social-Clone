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
		this.props.getAuth();
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
					errors={this.props.errors}
				/>
				{/* all expected posts */}
				{this.props.paginatedPosts.data.map((post) => (
					<ExpectedPost
						key={post.id}
						auth={this.props.auth}
						post={post}
						deletePost={() => this.props.deleteExpectedPost(post.id)}
					/>
				))}

				<div className='card' style={{ marginBottom: '5px' }}>
					<div className='card-body'>
						<a
							onClick={() => this.props.loadMorePosts(this.props.paginatedPosts.current_page)}
							href='javascript:0'
						>
							Load More...
						</a>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.ExpectedPostsReducer.auth,
		paginatedPosts: state.ExpectedPostsReducer.paginatedPosts,
		newPost: state.ExpectedPostsReducer.newPost,
		errors: state.ExpectedPostsReducer.errors,
		isPostCreated: state.ExpectedPostsReducer.postCreated
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpectedPosts);
