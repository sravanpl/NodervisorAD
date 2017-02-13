/*
 * GET/POST groups page
 */

exports.groups = function(params) {
	var config = params.config;
	var db = params.db;
	return function(req, res) {

		if ((!req.session.loggedIn) || (req.session.user.Role != 'Admin')) {
			res.redirect('/login');
		} else if (req.body.delete !== undefined) {
			if (req.params.idGroup) {
				params.db('groups').delete()
				.where('idGroup', req.params.idGroup)
				.exec(function() {
					res.redirect('/groups');
				});
			}
		} else if (req.body.submit !== undefined) {
			if (req.params.idGroup == 'new') {
				params.db('groups').insert({
					Name: req.body.name,
				}, 'idGroup').exec(function(err, insertId){
					if (err !== null) {
						console.log(err);
						res.redirect('/groups');
					} else {
						res.redirect('/group/' + insertId);
					}
				});
			} else {
				var info = {
					Name: req.body.name,
				};

				params.db('groups').update(info)
				.where('idGroup', req.params.idGroup)
				.exec(function() {
					res.redirect('/group/' + req.params.idGroup);
				});
			}
		} else {
			var qry = params.db('groups');

			if (req.params.idGroup) {
				if (req.params.idGroup == 'new') {
					res.render('edit_group', {
						title: 'Nodervisor - Edit Group',
						group: null,
						session: req.session
					});
				} else {
					qry.where('idGroup', req.params.idGroup)
					.exec(function(err, group){
						res.render('edit_group', {
							title: 'Nodervisor - Edit Group',
							group: group[0],
							session: req.session
						});
					});
				}
			} else {
				qry.exec(function(err, groups){
					res.render('groups', {
						title: 'Nodervisor - Groups',
						groups: groups,
						session: req.session
					});
				});
			}
		}
	};
};
