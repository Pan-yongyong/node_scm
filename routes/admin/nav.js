var express = require('express');
var url = require('url')
var router = express.Router();
var NavModule = require('../../mdule/admin/nav.js')

router.get('/',async function(req, res) {
	let result = await NavModule.find({})
	res.send(result)
})

router.get('/add', function(req, res) {
	reqUrl = url.parse(req.url, true).query
	if(reqUrl.title && reqUrl.url) {
		let navdb = new NavModule(reqUrl)
		navdb.save(function(err, data) {
			if(err) return
			res.status(200).send('添加成功')
		})
	}else{
		res.send('缺少参数')
	}
})

module.exports = router