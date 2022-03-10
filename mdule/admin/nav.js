const mongoose = require('../db.js')

let Schema = mongoose.Schema

let NavSchema = new Schema({
	title: {type: String},
	url: {type: String},
	add_time: {type: Date},
	status: {
		type: Number,
		default: 1
	}
})

let NavModule = mongoose.model('Nav', NavSchema, 'nav')
module.exports = NavModule