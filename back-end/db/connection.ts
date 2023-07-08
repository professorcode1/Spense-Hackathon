const knex_connection = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : process.env.LOCALDBPASS,
      database : 'spensehackdb'
    }
});

export default knex_connection