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
			},
			alert: null
		};

		this.onChange = this.onChange.bind(this);
		this.createPost = this.createPost.bind(this);
		this.hideAlert = this.hideAlert.bind(this);
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

		const alert = <SweetAlert timeout={3000} title='Here&#39;s a message!' onConfirm={this.hideAlert} />;
		this.setState({
			alert: alert
		});
	}

	hideAlert() {
		this.setState({
			alert: null
		});
	}

	render() {
		return (
			<div className='col-md-4'>
				{this.state.alert}
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
