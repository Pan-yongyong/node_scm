const mongoose = require('../db.js')

let Schema = mongoose.Schema

let RotationSchema = new Schema({
	title: {
		type: String
	},
	img_url: {
		type: String
	},
	status: {
		type: Number,
		default: 1
	}
})
let RotationModel = mongoose.model('Rotation', RotationSchema, 'rotation')
module.exports = RotationModel