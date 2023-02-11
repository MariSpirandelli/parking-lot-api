import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `${__dirname}/../../${process.env.NODE_ENV}.env` });

const env = process.env.NODE_ENV || 'development';
const port = +process.env.PORT || 3000;

const knex = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL || 'postgresql://user:password@db:5432/vccess-dev?schema=public',
  migrations: {
    directory: `${__dirname}/../objection/migrations`,
    tableName: 'knex_migrations',
  },
  seeds: {
    run: Boolean(process.env.SEED_ON_DEPLOY),
    directory: `${__dirname}/../objection/seeds`,
  },
  pool: {
    min: +process.env.MIN_CONNECTION_POOL || 4,
    max: +process.env.MAX_CONNECTION_POOL || 30,
  },
};

export default {
  env,
  knex,
  port,
};
