import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import RegisterForm from '../components/Register/RegisterForm/RegisterForm';
import Validation from '../libraries/validation/validation';

const rules = {
	fname: [ 'required', 'alpha_dash', 'max:2' ],
	lname: [ 'required', 'alpha_dash', 'max:2' ],
	phone: [ 'required' ],
	birth_date: [ 'required' ],
	gender: [ 'required' ],
	email: [ 'required', 'email', 'max:255' ],
	password: [ 'required', 'alpha_dash', 'min:6', 'confirmed:password_confirmation:1' ],
	password_confirmation: [ 'required', 'confirmed:password:1' ]
};

const errors = {
	name: [],
	email: [],
	password: [],
	password_confirmation: []
};
export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				fname: '',
				lname: '',
				email: '',
				phone: '',
				birth_date: '',
				gender: 'male',
				password: '',
				password_confirmation: ''
			},
			errors
		};
		this.submitForm = this.submitForm.bind(this);
		this.handleChangeInput = this.handleChangeInput.bind(this);
	}

	handleChangeInput(e) {
		const newUser = { ...this.state.user };
		newUser[e.target.name] = e.target.value;
		this.setState({ user: newUser });

		let keyError = new Validation(newUser, {
			[e.target.name]: rules[e.target.name]
		});

		console.log(keyError.errors());

		// if (Object.keys(keyError).length > 0) {
		// 	let errors = { ...this.state.errors };
		// 	errors[e.target.name] = keyError[e.target.name] || [];
		// 	this.setState({ errors });
		// }
		// else {
		// 	if (e.target.name === 'password' || e.target.name === 'passowrd_confirmation') {
		// 		let errors = { ...this.state.errors };
		// 		errors['password'] = [];
		// 		errors['password_confirmation'] = [];
		// 		this.setState({ errors });
		// 	}
		// 	else this.setState({ errors });
		// }
	}

	submitForm(e) {
		e.preventDefault();

		let errors = new Validation(this.state.user, rules);

		if (Object.keys(errors).length > 0) this.setState({ errors });
		else {
			axios
				.post(laroute.route('register-user'), { ...this.state.user })
				.then(response => {
					response.data.status
						? (window.location.href = response.headers.url)
						: this.setState({ errors: response.data.errors });
				})
				.catch(error => console.log(error));
		}
	}

	render() {
		return (
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-8'>
						<div className='card'>
							<div className='card-header'>Register</div>
							<div className='card-body'>
								<RegisterForm
									user={this.state.user}
									onchange={this.handleChangeInput}
									onsubmit={this.submitForm}
									errors={this.state.errors}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

if (document.getElementById('register')) {
	ReactDOM.render(<Register />, document.getElementById('register'));
}
