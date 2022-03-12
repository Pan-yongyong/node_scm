const express = require('express');
const router = express.Router();
const url = require('url')
var md5 = require('md5');
const Userdb = require('../../mdule/admin/user.js')

//获取用户
router.get('/', async function(req, res) {
	let result = await Userdb.find({})
	res.send(result)
})

//添加用户
router.get('/add', function(req, res) {
	let reqUrl = url.parse(req.url, true).query
	if(reqUrl.username && reqUrl.password) {
		let userdb = new Userdb({
			username: reqUrl.username,
			password: md5(reqUrl.password)
		})
		userdb.save(function(err, data) {
			if(err) return
			res.status(200).send('添加成功')
		})
	}else{
		res.send('参数不全')
	}
})

router.post('/', function(req, res) {
	console.log(req.body)
})

module.exports = router