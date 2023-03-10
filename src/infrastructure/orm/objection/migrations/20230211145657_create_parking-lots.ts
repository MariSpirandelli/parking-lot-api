import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('parking_lots', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.string('name').defaultTo('default');
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('parking_lots');
}
