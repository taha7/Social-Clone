import axios from 'axios';

const mapDispatchToProps = (dispatch) => {
	return {
		loadExpectedPosts: () => {
			axios
				.get(laroute.route('posts.index'))
				.then(({ data }) => dispatch({ type: 'LOAD_POSTS', payload: data.posts }))
				.catch((error) => console.log(error));
		},
		createExpectedPost: (post) => {
			axios
				.post(laroute.route('posts.store'), post)
				.then(({ data }) => dispatch({ type: 'CREATE_POST', payload: data.post }))
				.catch((error) => console.log(error));
		},
		onChangeInput: (e) => dispatch({ type: 'CHANGE_INPUT', event: e }),
		onHideAlert: () => dispatch({ type: 'HIDE_ALERT' })
	};
};

export default mapDispatchToProps;
