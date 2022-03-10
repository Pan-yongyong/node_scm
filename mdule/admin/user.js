const mongoose = require('../db.js')

var Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: {type: String},
	password: {type: String},
	login_time: {type: Date},
	add_time: {type: Date},
	status: {
		default: 1,
		type: Number
	}
})

let UserModel = mongoose.model('User', UserSchema, 'user')

module.exports = UserModel