import React from 'react';

const RegisterForm = props => {
	const hasError = prop => {
		return props.errors.hasOwnProperty(prop) && props.errors[prop].length > 0;
	};
	const errorMess = prop => {
		return hasError(prop) ? props.errors[prop][0] : null;
	};

	return (
		<form action='#' onSubmit={props.onsubmit}>
			{/******** First Name *************/}
			<div className='form-row'>
				<div className='col-md-6 form-group'>
					<input
						value={props.user.fname}
						onChange={props.onchange}
						type='text'
						className={'form-control ' + (hasError('fname') ? 'is-invalid' : '')}
						name='fname'
						placeholder='First Name'
					/>
					<div className='danger-text'>{errorMess('fname')}</div>
				</div>
				{/******** Last Name *************/}
				<div className='col-md-6 form-group'>
					<input
						value={props.user.lname}
						onChange={props.onchange}
						type='text'
						className={'form-control ' + (hasError('lname') ? 'is-invalid' : '')}
						name='lname'
						placeholder='Last Name'
					/>
					<div className='danger-text'>{errorMess('lname')}</div>
				</div>
			</div>

			{/******** email *************/}
			<div className='form-group'>
				<input
					value={props.user.email}
					onChange={props.onchange}
					type='email'
					className={'form-control ' + (hasError('email') ? 'is-invalid' : '')}
					name='email'
					placeholder='Your Email'
				/>
				<div className='danger-text'>{errorMess('email')}</div>
			</div>
			{/******** phone *************/}
			<div className='form-group'>
				<input
					value={props.user.phone}
					onChange={props.onchange}
					type='text'
					className={'form-control ' + (hasError('phone') ? 'is-invalid' : '')}
					name='phone'
					placeholder='Mobile Number'
				/>
				<div className='danger-text'>{errorMess('phone')}</div>
			</div>

			{/******** Birth Date *************/}
			<div className='form-group'>
				<label htmlFor='birth_date'>Birth Date</label>
				<input
					id='birth_date'
					value={props.user.birth_date}
					onChange={props.onchange}
					type='date'
					className={'form-control ' + (hasError('birth_date') ? 'is-invalid' : '')}
					name='birth_date'
				/>
				<div className='danger-text'>{errorMess('birth_date')}</div>
			</div>

			{/******** Gender *************/}
			<div className='form-group'>
				<label htmlFor='gender'>Gender</label>
				<div className='form-control'>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='gender'
							onChange={props.onchange}
							id='male'
							value='male'
							defaultChecked
						/>
						<label className='form-check-label' htmlFor='male'>
							Male
						</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='gender'
							onChange={props.onchange}
							id='female'
							value='female'
						/>
						<label className='form-check-label' htmlFor='female'>
							Female
						</label>
					</div>
				</div>
			</div>

			{/******** password *************/}
			<div className='form-group'>
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
				<input
					value={props.user.password_confirmation}
					onChange={props.onchange}
					name='password_confirmation'
					type='password'
					className={
						'form-control ' +
						(hasError('password_confirmation') ? 'is-invalid' : '')
					}
					required
					placeholder='Password Confirmation'
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
