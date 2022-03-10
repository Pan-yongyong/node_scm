var express = require('express');
var router = express.Router();
var NavModule = require('../../mdule/admin/nav.js')

router.get('/',async function(req, res) {
	let result = await NavModule.find({})
	res.send(result)
})

router.get('/add', function(req, res) {
	let navdb = new NavModule({
		title: '首页',
		url: 'www.baidu.com',
	})
	navdb.save(function(err, data) {
		if(err) return
		console.log('添加成功')
	})
	res.send('添加nav')
})

module.exports = router