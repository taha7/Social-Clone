import validationMessages from './validationMessages';
import validationFunctions from './validationFunctions';

export default class Validation {
	constructor(object, rules) {
		this.object = object;
		this.rules = rules;
		this.isValid = true;
		this.errorConfirmation = {};

		return this.validate();
	}

	fails() {
		return !this.isValid;
	}

	errors() {
		return this.errorConfirmation;
	}

	runFunction(func, object, property) {
		let vs = new validationFunctions(object, property);
		return vs.testValueByFunction(func.split(':'), object[property]);
	}

	createMessages(func, property) {
		let messages = this.errorConfirmation[property] || [];
		let message = validationMessages[func.split(':')[0]].replace(':attribute', property);
		messages.push(message);
		this.errorConfirmation[property] = messages;
	}

	validate() {
		Object.keys(this.object).forEach(property => {
			if (this.rules.hasOwnProperty(property)) {
				this.rules[property].forEach(func => {
					let confirm = this.runFunction(func, this.object, property);
					if (confirm !== null && confirm === false) {
						this.createMessages(func, property);
					}
				});
			}
		});

		this.isValid = Object.keys(this.errorConfirmation).length > 0 ? false : true;
		return this;
	}
}
