import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchResult from '../components/NavbarSearch/SearchResult';

export default class NavbarSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			resultLoading: false,
			inputLoading: false,
			users: [],
			searched: '',
			filteredUsers: []
		};

		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSearchSesult = this.handleSearchSesult.bind(this);
		this.handleAddUser = this.handleAddUser.bind(this);
		this.handleAcceptFriend = this.handleAcceptFriend.bind(this);
		this.updateFilteredUsers = this.updateFilteredUsers.bind(this);
		this.handleRemoveFriendRequest = this.handleRemoveFriendRequest.bind(this);
	}

	componentDidMount() {
		let myThis = this;
		$(document).click(function({ target }) {
			if (
				!$(target).is('#search-result') &&
				!$(target).parents().is('#search-result') &&
				!$(target).is('#search-input')
			) {
				myThis.setState({ resultLoading: false });
			}
		});
	}

	handleFocus() {
		// Get Old results
		this.setState({ resultLoading: true });
	}

	handleChange(e) {
		let searched = e.target.value;
		this.setState({ searched: searched, inputLoading: true });
		if (searched.trim() !== '') {
			axios
				.get(laroute.route('users.search', { key: searched }))
				.then(({ data }) => this.setState({ filteredUsers: data.users, inputLoading: false }))
				.catch(errors => console.log(errors));
		}
		else this.setState({ inputLoading: false });
	}

	updateFilteredUsers(friend) {
		const filteredUsers = this.state.filteredUsers.map(user => {
			return user.id == friend.id ? friend : user;
		});

		this.setState({ filteredUsers });
	}

	handleAddUser(friend) {
		axios.get(laroute.route('user.addfriend', { friend })).then(({ data }) => {
			this.updateFilteredUsers(data.friend);
		});
	}

	handleAcceptFriend(friend) {
		axios.get(laroute.route('user.acceptfriend', { friend })).then(({ data }) => {
			this.updateFilteredUsers(data.friend);
		});
	}

	handleRemoveFriendRequest(friend) {
		axios.get(laroute.route('user.removefriend', { friend })).then(({ data }) => {
			this.updateFilteredUsers(data.friend);
		});
	}

	handleSearchSesult() {
		if (this.state.resultLoading) {
			if (this.state.searched.trim() === '')
				return (
					<SearchResult>
						<div>Type Something</div>
					</SearchResult>
				);

			if (this.state.filteredUsers.length !== 0)
				return (
					<SearchResult
						addFriend={this.handleAddUser}
						acceptFriend={this.handleAcceptFriend}
						removeFriendRequest={this.handleRemoveFriendRequest}
						users={this.state.filteredUsers}
					/>
				);

			if (this.state.inputLoading)
				return (
					<SearchResult>
						<div>loading...!</div>
					</SearchResult>
				);

			return (
				<SearchResult>
					<div>No Matched Result</div>
				</SearchResult>
			);
		}

		return null;
	}

	render() {
		return (
			<div>
				<form style={{ width: '450px' }}>
					<input
						id='search-input'
						value={this.state.searched}
						onFocus={() => this.handleFocus()}
						onChange={this.handleChange}
						className={
							'form-control ' +
							(this.state.inputLoading ? 'input-loading' : '')
						}
						type='text'
					/>
				</form>
				{this.handleSearchSesult()}
			</div>
		);
	}
}

if (document.getElementById('navbar-search')) {
	ReactDOM.render(<NavbarSearch />, document.getElementById('navbar-search'));
}
