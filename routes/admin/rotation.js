const express = require('express');
const router = express.Router();
const Rotationdb = require('../../mdule/admin/rotation.js')
const upload = require('../../util/multer.js')
router.post('/add', upload.single('singleFile'), function(req, res) {
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

module.exports = router