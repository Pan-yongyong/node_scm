var express = require('express');
var url = require('url')
var router = express.Router();
var NavModule = require('../../mdule/admin/nav.js')

// 获取所有导航
router.get('/',async function(req, res) {
	let pageInfo = url.parse(req.url, true).query
	pageInfo.page === 1 ? pageInfo.page = 1 : pageInfo.page
	let result = await NavModule.find({}).skip(pageInfo.page * pageInfo.pagesize).limit(pageInfo.pagesize)
	res.send(result)
})
// 新增导航
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
// 修改导航
router.post('/edit',async function(req, res) {
	let _id = req.body._id
	NavModule.updateOne({_id}, {$set: {...req.body}}, function(err, data) {
		if(err) {
			res.status(404).send(err)
			return
		}
		res.status(200).send('修改成功')
	})
})

// 删除导航
router.delete('/delete',async function(req, res) {
	let delparams = url.parse(req.url, true).query
	let data = await NavModule.find({_id: delparams._id})
	if(data.length) {
		NavModule.deleteOne({_id: delparams._id}, function(err, result){
			if(err){
				res.status(404).send(err)
				return
			}
			res.status(200).send('删除成功')
			return
		})
	}else{
		res.send(`找不到_id为${delparams._id}的数据`)
	}
})

module.exports = router