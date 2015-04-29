
/*
 * GET home page.
 */



module.exports = function(app) {
	app.get('/', function (req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('/login', function (req, res) {
		res.render('tpl/login');
	});

	app.get('/getData', function (req, res) {
		var Mock = require('mockjs');
		var data = Mock.mock({
		    'list|1-10': [{
		        'id|+1': 1
		    }]
		});
		console.log(data)
		res.send(JSON.stringify(data, null, 4));
	});

	app.get('/getUser', function (req, res) {
		var user = null;
		user = req.session.user == undefined ? null : req.session.user;
		res.send(JSON.stringify(user));
	});
};