import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('vehicle_types', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.enum('type', ['motorcycle', 'car', 'van']).notNullable();
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('vehicle_types');
}
