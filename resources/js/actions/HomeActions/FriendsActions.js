const mapDispatchToProps = dispatch => {
	return {
		loadFriends: () => {
			return dispatch({ type: 'LOAD_FRIENDS', payload: null });
		}
	};
};

export default mapDispatchToProps;
