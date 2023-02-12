import { Knex } from 'knex';

exports.seed = (knex: Knex): Promise<any> => {
  return knex('parking_lots').insert({
    created_at: new Date().toISOString(),
  });
};
