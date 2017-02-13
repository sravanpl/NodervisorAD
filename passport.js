var windowStrategy = require('passport-windowsauth');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done, err) {
        if (err)
            done(err, obj);
        else
            done(null, obj);
    });

    passport.use('wauth', new windowStrategy({
            ldap: {
                url: 'ldap://192.168.189.146:389',
                base: 'DC=hlsc,DC=com',
                bindDN: 'cn=sravankumar,CN=Users,DC=hlsc,DC=com',
                bindCredentials: 'tcsOntcl@10'
            },
            integrated: false
        },
        function(profile, done, err) {
        	
            if (err) {
            		console.log(err);
            	    return done(err);
            } else{
            	console.log("line 29 "+profile);
                return done(null, profile);
            }
        }))


}
