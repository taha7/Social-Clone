import axios from 'axios';

const mapDispatchToProps = (dispatch) => {
	return {
		loadExpectedPosts: () => {
			axios.get(laroute.route('posts.index')).then((response) => {
				dispatch({
					type: 'LOAD_POSTS',
					payload: response.data.data
				});
			});
		},
		createExpectedPost: (post) => {
			axios.post(laroute.route('posts.store'), post).then((response) => {
				dispatch({
					type: 'CREATE_POST',
					payload: response.data.post
				});
			});
		}
	};
};

export default mapDispatchToProps;
