
exports.up = function (knex) {
    return knex.schema.createTable('bookings', t => {
        t.increments('id')
        t.integer('movie_id').references('movies.id');
        t.integer('seat_row');
        t.integer('seat_column');
        t.string('show_time');
        t.date('booking_date');
        t.integer('created_by').references('users.id');
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('modified_at')
        t.timestamp('deleted_at')
        t.boolean('is_deleted').defaultTo(false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('bookings')
};
