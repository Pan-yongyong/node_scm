var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
const url = require('url')
var md5 = require('md5');
const Userdb = require('../../mdule/admin/user.js')

//用户登入验证码
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    
    // res.type('svg');
    res.status(200).send(captcha);
});

// 登入
router.get('/',async function(req,res) {
	let userinfo = url.parse(req.url, true).query
	if(userinfo.captcha === req.session.captcha) {
		let result = await Userdb.find({
			username: userinfo.username,
			password: md5(userinfo.password)
		})
		if(result.length) {
			req.session.userinfo = userinfo
			res.status(200).send('登入成功')
		}else{
			res.send('用户名或密码错误')
		}
	}
	res.send('验证码错误')
})

// 登出
router.get('/loginOut', function(req, res) {
	delete res.session.userinfo
	res.send('退出登入成功')
})

module.exports = router