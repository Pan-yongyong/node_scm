var express = require('express');
var router = express.Router();
const Userdb = require('../../mdule/admin/user.js')

router.get('/', async function(req, res) {
	let result = await Userdb.find({})
	res.send(result)
})

router.get('/add', function(req, res) {
	let userdb = new Userdb({
		username: 'admin',
		password: '123321'
	})
	userdb.save(function(err, data) {
		if(err) return
		console.log('添加成功')
	})
	res.send('user')
})

module.exports = router