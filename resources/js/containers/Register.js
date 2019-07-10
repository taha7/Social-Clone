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
	password: [ 'required', 'alpha_dash', 'min:6', 'confirmed:password_confirmation:1' ]
};

const errors = {
	fname: [],
	lname: [],
	phone: [],
	birth_date: [],
	gender: [],
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
		this.handleBlurInput = this.handleBlurInput.bind(this);
		this.handleBlurPassword = this.handleBlurPassword.bind(this);
	}

	handleChangeInput(e) {
		this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });
	}

	handleBlurInput(e) {
		let validator = new Validation(
			{ ...this.state.user },
			{
				[e.target.name]: rules[e.target.name] || []
			}
		);
		let errors = { ...this.state.errors };
		errors[e.target.name] = validator.fails() ? validator.errors()[e.target.name] : [];

		this.setState({ errors });
	}

	handleBlurPassword(e) {
		let validator = new Validation({ ...this.state.user }, { password: rules['password'] });
		let errors = { ...this.state.errors };
		errors['password'] = validator.fails() ? validator.errors()['password'] : [];
		this.setState({ errors });
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
									onBlur={this.handleBlurInput}
									onPasswordBlur={this.handleBlurPassword}
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
