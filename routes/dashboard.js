/*
 * GET supervisord page
 */

exports.dashboard = function(params) {
	return function(req, res) {

		if (!req.session.loggedIn) {
			res.redirect('/login');
		}

		res.render('dashboard', {
			title: 'Nodervisor - Dashboard',
			session: req.session
		});
	};
};
