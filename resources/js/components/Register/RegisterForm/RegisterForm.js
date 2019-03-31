import React from 'react';

const RegisterForm = (props) => {
	const hasError = (prop) => {
		return props.errors.hasOwnProperty(prop) && props.errors[prop].length > 0;
	};
	const errorMess = (prop) => {
		return hasError(prop) ? props.errors[prop][0] : null;
	};

	return (
		<form action='#' onSubmit={props.onsubmit}>
			{/******** name *************/}
			<div className='form-group'>
				<label htmlFor='name'>Name</label>
				<input
					value={props.user.name}
					onChange={props.onchange}
					type='text'
					className={'form-control ' + (hasError('name') ? 'is-invalid' : '')}
					name='name'
					placeholder='User Name'
				/>
				<div className='danger-text'>{errorMess('name')}</div>
			</div>
			{/******** email *************/}
			<div className='form-group'>
				<label htmlFor='email'>Email address</label>
				<input
					value={props.user.email}
					onChange={props.onchange}
					type='email'
					className={'form-control ' + (hasError('email') ? 'is-invalid' : '')}
					name='email'
					placeholder='Enter email'
				/>
				<div className='danger-text'>{errorMess('email')}</div>
			</div>

			{/******** password *************/}
			<div className='form-group'>
				<label htmlFor='password'>Password</label>
				<input
					value={props.user.password}
					onChange={props.onchange}
					name='password'
					type='password'
					className={'form-control ' + (hasError('password') ? 'is-invalid' : '')}
					placeholder='Password'
					required
				/>
				<div className='danger-text'>{errorMess('password')}</div>
			</div>
			{/******** password_confirmation *************/}
			<div className='form-group'>
				<label htmlFor='password-confirm'>Confirm Password</label>
				<input
					value={props.user.password_confirmation}
					onChange={props.onchange}
					name='password_confirmation'
					type='password'
					className={'form-control ' + (hasError('password_confirmation') ? 'is-invalid' : '')}
					required
				/>
				<div className='danger-text'>{errorMess('password_confirmation')}</div>
			</div>
			{/******** Submit *************/}
			<button type='button' onClick={props.onsubmit} className='btn btn-primary'>
				Register
			</button>
		</form>
	);
};

export default RegisterForm;
