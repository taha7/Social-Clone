const initialeState = {
	posts: []
};

const expectedPostsReducer = (state = initialeState, action) => {
	switch (action.type) {
		case 'LOAD_POSTS':
			return {
				...state,
				posts: action.payload
			};
		case 'CREATE_POST':
			const updatedState = jQuery.extend(true, {}, state);
			updatedState.posts.unshift(action.payload);
			return updatedState;
		// return {
		// 	...state,
		// 	posts: state.posts.reverse().concat(action.payload).reverse()
		// };
		default:
			return state;
	}
};

export default expectedPostsReducer;
