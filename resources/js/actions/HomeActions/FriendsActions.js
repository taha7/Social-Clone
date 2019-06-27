const mapDispatchToProps = dispatch => {
	return {
		loadMyFriends: () => {
			axios
				.get(laroute.route('user.friends'))
				.then(({ data }) => dispatch({ type: 'LOAD_FRIENDS', payload: data.friends }))
				.catch(error => console.log(error));
		}
	};
};

export default mapDispatchToProps;
