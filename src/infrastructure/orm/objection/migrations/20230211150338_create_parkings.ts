import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('parkings', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');
    
    table.integer('slot_id').references('id').inTable('slots');
    table.integer('vehicle_id').references('id').inTable('vehicles');
    table.dateTime('checkin_at').notNullable();
    table.dateTime('checkout_at');
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('parkings');
}
