module.exports = {
		development: {
		client: 'pg',
		// connection: 'postgres://localhost/bikesdb'
    connection: {
      host     : '127.0.0.1',
       user     : 'alex',
       password : 'fixture',
       database : 'bikesdb'
     }
		},

		production: {
		client: 'pg',
		connection: process.env.DATABASE_URL
		}
	};
