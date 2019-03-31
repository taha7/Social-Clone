import React, { Component } from 'react';
import { connect } from 'react-redux';

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
	}

	componentDidMount() {
		this.props.loadExpectedPosts();
	}

	onChange(e) {
		const post = jQuery.extend(true, {}, this.state.post);
		post[e.target.name] = e.target.value;

		this.setState({
			post
		});
	}

	createPost(post) {
		this.props.createExpectedPost(post);

		this.setState({
			post: { body: '' }
		});
	}

	render() {
		return (
			<div className='col-md-4'>
				<CreatePost
					changed={this.onChange}
					postCreated={() => this.createPost(this.state.post)}
					post={this.state.post}
				/>
				{this.props.posts.map((post) => <ExpectedPost key={post.id} post={post} />)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		posts: state.ExpectedPostsReducer.posts
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpectedPosts);
