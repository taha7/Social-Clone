const initialeState = {
	posts: [],
	newPost: {
		body: ''
	},
	postCreated: false
};

const expectedPostsReducer = (state = initialeState, action) => {
	switch (action.type) {
		case 'LOAD_POSTS':
			return {
				...state,
				posts: action.payload
			};
		case 'CREATE_POST':
			return {
				...state,
				posts: [ action.payload ].concat(state.posts),
				newPost: { body: '' },
				postCreated: true
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
