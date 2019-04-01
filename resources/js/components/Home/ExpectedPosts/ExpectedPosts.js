import React, { Component } from 'react';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import ExpectedPost from './ExpectedPost/ExpectedPost';
import mapDispatchToProps from '../../../actions/HomeActions/ExpectedPostsActions';
import CreatePost from './CreatePost/CreatePost';

class ExpectedPosts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			post: {
				body: ''
			}
		};

		this.onChange = this.onChange.bind(this);
		this.createPost = this.createPost.bind(this);
		this.hideAlert = this.hideAlert.bind(this);
	}

	componentDidMount() {
		this.props.loadExpectedPosts();
	}

	onChange(e) {
		this.props.onChangeInput(e);
		// const post = jQuery.extend(true, {}, this.state.post);
		// post[e.target.name] = e.target.value;

		// this.setState({
		// 	post
		// });
	}

	createPost(post) {
		this.props.createExpectedPost(post);
	}

	hideAlert() {
		this.props.onHideAlert();
	}

	render() {
		let alert = null;
		if (this.props.isPostCreated) {
			alert = (
				<SweetAlert success timeout={2000} title='The post has been published' onConfirm={this.hideAlert} />
			);
		} else {
			alert = null;
		}

		return (
			<div className='col-md-5'>
				{alert}
				<CreatePost
					changed={this.onChange}
					postCreated={() => this.createPost(this.props.newPost)}
					post={this.props.newPost}
				/>
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
