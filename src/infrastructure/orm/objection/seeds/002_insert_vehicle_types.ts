import { Knex } from 'knex';

exports.seed = (knex: Knex): Promise<any> => {
  const vehicleTypes = [
    {
      created_at: new Date().toISOString(),
      type: 'motorcycle',
    },
    {
      created_at: new Date().toISOString(),
      type: 'car',
    },
    {
      created_at: new Date().toISOString(),
      type: 'van',
    },
  ];

  return knex('vehicle_types').insert(vehicleTypes);
};
