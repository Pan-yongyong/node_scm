const express = require('express');
const router = express.Router();
const url = require('url')
var md5 = require('md5');
const Userdb = require('../../mdule/admin/user.js')

//获取用户
router.get('/', async function(req, res) {
	let pageInfo = url.parse(req.url, true).query
	pageInfo.page === 1 ? pageInfo.page = 1 : pageInfo.page
	let result = await Userdb.find({}).skip(pageInfo.page * pageInfo.pagesize).limit(pageInfo.pagesize)
	res.send(result)
})

//添加用户
router.get('/add',async function(req, res) {
	let reqUrl = url.parse(req.url, true).query
	let ret = await Userdb.find({username: reqUrl.username})
	if(ret.length) {
		res.status(200).send('用户名已存在')
		return
	}
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
//修改用户，通过id获取需要修改的数据
// https://blog.csdn.net/y5946/article/details/89605151
router.post('/edit',function(req, res) {
	// 通过_id修改
	let {_id, username, password} = { ...req.body }
	Userdb.updateOne({_id:_id}, {$set: {
		username,
		password
	}}, (err, result) => {
		if(err){
			res.status(404).send(err)
			return
		}
		res.status(200).send('修改成功')
	})
})

// 删除用户
router.delete('/delete',async function(req, res){
	let delparams = url.parse(req.url, true).query
	let data = await Userdb.find({_id: delparams._id})
	if(data.length) {
		Userdb.deleteOne({_id: delparams._id}, function(err, restule) {
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