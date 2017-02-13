/*
 * GET/POST login page
 */

exports.login = function(params) {
	return function(req, res) {
		
	/*	if (req.session.loggedIn) {
			res.redirect('/');
		}*/
//req.session.loggedIn = bcrypt.compareSync(req.body.password, user[0].Password);
		if (req.method=='POST') {
			console.log(req.body.username);
			console.log(req.body.password);
			params.passport.authenticate('wauth',function (err,user,info) {
				if(err){
					console.log(err);
					return next(err);
				}
				if(!user){
					console.log('no user');					
				}
				console.log("sra 22"+ user._json.cn);
				var userObj ={};
				userObj.Name=user._json.cn;
				if(user._json.primaryGroupID==513){
					console.log('setting admin');
					userObj.Role='Admin';
				}
				
				 
				req.session.user=userObj;
				req.session.gid=user._json.primaryGroupID;
				req.session.loggedIn=1;
				 
				console.log('redrecing to /dashboard');
				res.redirect('/dashboard');
			})(req,res);
		} else {
			res.render('login', {
				title: 'Nodervisor - Login',
				session: req.session
			});
		}
	};
};
