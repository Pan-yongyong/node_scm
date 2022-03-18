const express = require('express');
const router = express.Router();
const url = require('url')
const fs = require('fs')
const Rotationdb = require('../../mdule/admin/rotation.js')
const upload = require('../../util/multer.js')
router.post('/add', upload.single('img_url'), function(req, res) {
	let img_url = req.file.path
	let title = req.body.title
	if(title && img_url) {
		let rotation = new Rotationdb({
			title,
			img_url
		})
		rotation.save()
		res.send('添加成功')
	}else{
		res.send('缺少参数')
	}
})

// 修改
router.post('/edit',upload.single('img_url'),async function(req, res) {
	let edId = req.body._id
	let img_url = req.file.path
	try{
		await Rotationdb.updateOne({_id: edId}, {$set:Object.assign(req.body, {img_url})})
		res.send('修改成功')
	}catch(e){
		res.status(404).send(e)
	}
})

// 删除
router.delete('/delete',async function(req, res) {
	let _id = url.parse(req.url, true).query
	try{
		let reslut = await Rotationdb.find({_id})
		await fs.unlink(reslut[0].img_url,async function(err, data) {
			if(err) {
				res.send(err)
				return
			}
			await Rotationdb.deleteOne({_id})
			res.send('删除成功')
		})
	}catch(e){
		//TODO handle the exception
		res.send(e)
	}
})
module.exports = router