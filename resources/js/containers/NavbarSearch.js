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
	}

	handleFocus() {
		this.setState({
			resultLoading: true
		});

		if (this.state.users.length === 0) {
			this.setState({
				inputLoading: true
			});
			axios.get(laroute.route('users.index')).then((response) => {
				this.setState({
					users: response.data.users,
					inputLoading: false
				});
			});
		}
	}

	handleChange(e) {
		let searched = e.target.value;
		this.setState({
			searched: searched
		});

		if (searched.trim() !== '') {
			const filteredUsers = this.state.users.filter((user) => {
				return user.name.toString().includes(searched);
			});

			this.setState({
				filteredUsers
			});
		}
	}

	handleAddUser(friendId) {
		// axios.get(`/api/add-friend/${friendId}`).then((response) => {
		// 	console.log(response.data);
		// });
	}

	handleSearchSesult() {
		let loadedResults = null;

		if (this.state.resultLoading) {
			if (this.state.filteredUsers.length !== 0) {
				loadedResults = <SearchResult addUser={this.handleAddUser} users={this.state.filteredUsers} />;
			} else {
				if (this.state.inputLoading) {
					loadedResults = (
						<SearchResult>
							<div>loading...!</div>
						</SearchResult>
					);
				} else {
					if (this.state.searched.trim() === '') {
						loadedResults = (
							<SearchResult>
								<div>Type Something</div>
							</SearchResult>
						);
					} else {
						loadedResults = (
							<SearchResult>
								<div>No Matched Result</div>
							</SearchResult>
						);
					}
				}
			}
		}

		return loadedResults;
	}

	render() {
		return (
			<div>
				<form style={{ width: '450px' }}>
					<input
						value={this.state.searched}
						onFocus={() => this.handleFocus()}
						onChange={this.handleChange}
						className={'form-control ' + (this.state.inputLoading ? 'input-loading' : '')}
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
