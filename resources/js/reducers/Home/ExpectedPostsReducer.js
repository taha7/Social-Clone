const initialeState = {
	posts: [],
	paginatedPosts: {},
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
				paginatedPosts: action.payload,
				posts: action.payload.data
			};
		case 'MORE_POSTS':
			return {
				...state,
				paginatedPosts: action.payload,
				posts: state.posts.concat(action.payload.data)
			};
		case 'CREATE_POST':
			return {
				...state,
				posts: [ action.payload ].concat(state.posts),
				newPost: { body: '' },
				postCreated: true,
				errors: {
					body: []
				}
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
