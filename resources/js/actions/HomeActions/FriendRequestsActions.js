const mapDispatchToProps = dispatch => {
	return {
		loadFriendRequests: () => {
			axios
				.get(laroute.route('user.friendrequests'))
				.then(({ data }) =>
					dispatch({ type: 'LOAD_FRIEND_REQUESTS', payload: data.friendRequests })
				)
				.catch(error => console.log(error));
		}
	};
};

export default mapDispatchToProps;
