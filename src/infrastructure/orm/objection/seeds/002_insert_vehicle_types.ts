import { Knex } from 'knex';

exports.seed = (knex: Knex): Promise<any> => {
  const vehicleTypes = [
    {
      created_at: new Date().toISOString(),
      type: 'motorcycle',
      order: 1,
    },
    {
      created_at: new Date().toISOString(),
      type: 'car',
      order: 2,
    },
    {
      created_at: new Date().toISOString(),
      type: 'van',
      order: 3,
    },
  ];

  return knex('vehicle_types').insert(vehicleTypes);
};
