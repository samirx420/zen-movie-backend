module.exports = {
  test: {
    client    : 'sqlite3',
    connection: {
      filename: './pzt.pz'
    },
    useNullAsDefault: true,
    debug           : true,
  },
  development: {
    client    : 'sqlite3',
    connection: {
      filename: './pzt.pz'
    },
    pool: {
      afterCreate: function (conn, done) {
        conn.run("PRAGMA cipher_compatibility = 3")
        conn.run("PRAGMA KEY = 'secret'");
        conn.run('PRAGMA foreign_keys = ON', done);
        done();
      }
    },
    useNullAsDefault: true,
    debug           : true,
    // migrations: {
    //   directory: './migrations',
    // },
    // seeds: {
    //   directory: './seeds'
    // }
  },
  production: {
    client    : 'postgresql',
    connection: process.env.DATABASE_URL,
    pool      : {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}