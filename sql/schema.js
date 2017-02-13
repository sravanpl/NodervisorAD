module.exports = {
    create: function(db){
        // Check for users table
        db.schema.hasTable('users')
        .then(function(exists){
            if (!exists){
                console.log('Building users table...');
                rarara = db.schema.createTable('users', function(table){
                    table.increments('id').primary();
                    table.string('Name', 32);
                    table.string('Email', 128);
                    table.string('Password', 128);
                    table.string('Role', 32);
                }).then(function(data){
                    console.log('Users table created.');
                    db('users').insert({
                        'Name': 'Admin',
                        'Email': 'admin@nodervisor',
                        'Password': '$2a$10$OI5bfzPATM2358vQlDYKweliWYI2FyJwqsDJUMXuqaSzM.7vNa3xu',
                        'Role': 'Admin',
                    }).then(function(){
                        console.log('Default admin user created using email:"admin@nodervisor" and password:"admin".');
                    });
                }).catch(function(err){
                    console.log(err);
                });
            }
        });

        // Check for hosts table
        db.schema.hasTable('hosts')
        .then(function(exists){
            if (!exists){
                console.log('Building hosts table...');
                db.schema.createTable('hosts', function(table){
                    table.increments('idHost').primary();
                    table.integer('idGroup');
                    table.string('Name', 32);
                    table.string('Url', 128);
                }).then(function(data){
                    console.log('Hosts table created.');
                }).catch(function(err){
                    console.log(err);
                });
            }
        });

        // Check for groups table
        db.schema.hasTable('groups')
        .then(function(exists){
            if (!exists){
                console.log('Building groups table...');
                db.schema.createTable('groups', function(table){
                    table.increments('idGroup').primary();
                    table.string('Name', 32);
                }).then(function(data){
                    console.log('Groups table created.');
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
    }
};
