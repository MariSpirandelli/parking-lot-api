import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('slots', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.integer('parking_lot_id').references('id').inTable('parking_lots').notNullable();
    table.integer('vehicle_type_id').references('id').inTable('vehicle_types').notNullable();
    table.enum('status', ['available', 'occupied']).notNullable();

    table.integer('left_slot_id').references('id').inTable('slots').nullable();
    table.integer('right_slot_id').references('id').inTable('slots').nullable();
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('slots');
}
