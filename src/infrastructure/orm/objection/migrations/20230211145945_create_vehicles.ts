import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('vehicles', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.integer('vehicle_type_id').references('id').inTable('vehicle_types');
    table.string('plate').notNullable();
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('vehicles');
}
