const initialeState = {
	paginatedPosts: {
		current_page: 0,
		data: []
	},
	newPost: {
		body: ''
	},
	errors: {
		body: []
	},
	postCreated: false
};

const expectedPostsReducer = (state = initialeState, action) => {
	switch (action.type) {
		case 'LOAD_POSTS':
			return {
				...state,
				paginatedPosts: action.payload
			};
		case 'MORE_POSTS':
			action.payload.data = state.paginatedPosts.data.concat(action.payload.data);
			return {
				...state,
				paginatedPosts: action.payload
			};
		case 'CREATE_POST':
			const newPosts = jQuery.extend(true, {}, state.paginatedPosts);
			newPosts.data = [ action.payload ].concat(newPosts.data);
			return {
				...state,
				paginatedPosts: newPosts,
				newPost: { body: '' },
				postCreated: true,
				errors: {
					body: []
				}
			};
		case 'DELETE_POST':
			const filteredPosts = jQuery.extend(true, {}, state.paginatedPosts);
			filteredPosts.data = filteredPosts.data.filter(post => post.id !== action.payload.id);
			return {
				...state,
				paginatedPosts: filteredPosts
			};
		case 'VALIDATION_ERROR':
			return {
				...state,
				errors: action.payload
			};
		case 'CHANGE_INPUT':
			return {
				...state,
				newPost: {
					[action.event.target.name]: action.event.target.value
				}
			};
		case 'HIDE_ALERT':
			return {
				...state,
				postCreated: false
			};
		default:
			return state;
	}
};

export default expectedPostsReducer;
