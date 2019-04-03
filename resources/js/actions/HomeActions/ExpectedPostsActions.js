import axios from 'axios';
import Validation from '../../libraries/validation/validation';

const mapDispatchToProps = (dispatch) => {
	return {
		loadExpectedPosts: () => {
			axios
				.get(laroute.route('posts.index') + '?page=1')
				.then(({ data }) => dispatch({ type: 'LOAD_POSTS', payload: data.paginatedPosts }))
				// .then(({ data }) => console.log(data.paginatedPosts))
				.catch((error) => console.log(error));
		},
		loadMorePosts: (currentPage) => {
			axios
				.get(laroute.route('posts.index') + `?page=${++currentPage}`)
				.then(({ data }) => dispatch({ type: 'MORE_POSTS', payload: data.paginatedPosts }))
				.catch((error) => console.log(error));
		},
		createExpectedPost: (post) => {
			let errors = new Validation(post, {
				body: [ 'required' ]
			});

			if (Object.keys(errors).length > 0) {
				dispatch({ type: 'VALIDATION_ERROR', payload: errors });
			} else {
				axios
					.post(laroute.route('posts.store'), post)
					.then(({ data }) => dispatch({ type: 'CREATE_POST', payload: data.post }))
					.catch((error) => console.log(error));
			}
		},
		onChangeInput: (e) => dispatch({ type: 'CHANGE_INPUT', event: e }),
		onHideAlert: () => dispatch({ type: 'HIDE_ALERT' })
	};
};

export default mapDispatchToProps;
