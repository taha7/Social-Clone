export default class validationFunctions {
	constructor(object, property) {
		this.object = object;
		this.property = property;
	}

	testValueByFunction(splits, value) {
		let confirm = null;
		if (this.hasFunction(splits[0])) {
			if (splits.length === 1) {
				confirm = this[splits[0]](value);
			}
			if (splits.length === 2) {
				confirm = this[splits[0]](value, splits[1]);
			}
			if (splits.length === 3) {
				confirm = this[splits[0]](value, this.object[`${this.property}_confirmation`]);
			}
		}
		return confirm;
	}

	hasFunction(functionName) {
		return typeof this[functionName] === 'function';
	}

	alpha(value) {
		let regex = /^[a-zA-Z]*$/;
		return regex.test(value);
	}

	alpha_dash(value) {
		let regex = /^[a-zA-Z0-9_ ]*$/;
		return regex.test(value);
	}

	confirmed(value, confirmation) {
		return value === confirmation;
	}

	email(value) {
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(value);
	}

	max(value, length) {
		return value.length <= length;
	}

	min(value, length) {
		return value.length >= length;
	}

	numeric(value) {
		let regex = /^[0-9]*$/;
		return regex.test(value);
	}

	required(value) {
		return value.trim() !== '';
	}

	fileRequired(value) {
		return value !== null;
	}

	mimes(value, ...mimes) {
		if (value) {
			return mimes[0].split(',').includes(value.name.split('.').pop().toLowerCase());
		}
	}
}
