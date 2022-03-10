const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/scm', function(err, douc) {
	if(err) return
	console.log('db连接成功')
})


module.exports = mongoose