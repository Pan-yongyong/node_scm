var express = require('express');
var router = express.Router();

let login = require('./admin/login.js')
let manager = require('./admin/manager.js')
let nav = require('./admin/nav.js')
let user = require('./admin/user.js')
let rotation = require('./admin/rotation.js')
// Multiplechoice多选
router.get('/', function(req, res) {
	res.send('/')
})

router.use('/login', login)
router.use('/manager', manager)
router.use('/nav', nav)
router.use('/user', user)
router.use('/rotation', rotation)

module.exports = router