import validationMessages from './validationMessages';
import validationFunctions from './validationFunctions';

export default class Validation {
	constructor(object, rules) {
		this.object = object;
		this.rules = rules;
		this.isValid = true;

		return this.validate();
	}

	runFunction(func, value) {
		let splits = func.split(':');

		let functions = new validationFunctions();
		if (typeof functions[splits[0]] === 'function') {
			let confirm = null;
			if (splits.length === 1) {
				confirm = functions[splits[0]](value);
			}
			if (splits.length === 2) {
				//ex  confirm = this.max("ahmed", 5);
				confirm = functions[splits[0]](value, splits[1]);
			}
			if (splits.length === 3) {
				confirm = functions[splits[0]](value, this.object[splits[1]]);
			}

			return confirm;
		}

		return null;
	}

	validate() {
		let errorConfirmation = {};

		Object.keys(this.object).forEach((property) => {
			if (this.rules.hasOwnProperty(property)) {
				this.rules[property].forEach((func) => {
					let confirm = this.runFunction(func, this.object[property]);
					if (confirm !== null && confirm === false) {
						let messages = errorConfirmation[property] || [];
						let message = validationMessages[func.split(':')[0]].replace(':attribute', property);
						messages.push(message);
						errorConfirmation[property] = messages;
					}
				});
			}
		});

		this.isValid = Object.keys(errorConfirmation).length > 0 ? false : true;
		return errorConfirmation;
	}
}
// const user = {
// 	name: 's]sssssss',
// 	email: 'ssss.com',
// 	password: '',
// 	password_confirmation: ''
// };

// const rules = {
// 	name: [ 'required', 'alpha_dash', 'max:5' ],
// 	email: [ 'required', 'max:5', 'email' ]
// };

// let validation = new Validation();
// let errors = validation.validate(user, rules);
// if (!validation.isValid) {
// 	console.log(errors);
// }
