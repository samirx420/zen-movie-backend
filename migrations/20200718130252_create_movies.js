
exports.up = function (knex) {
    return knex.schema.createTable('movies', t => {
        t.increments('id')
        t.string('title')
        t.text('description')
        t.integer('created_by').references('users.id');
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('modified_at')
        t.timestamp('deleted_at')
        t.boolean('is_deleted').defaultTo(false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('movies')
};
