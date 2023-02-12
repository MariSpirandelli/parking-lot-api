import bunyan from 'bunyan';
import Knex from 'knex';
import { Model } from 'objection';
import { ORM } from '../index';

import config from '../../config';

export const dbLogger = bunyan.createLogger({ name: 'db' });

const MIGRATION_PATH = '/../objection/migrations';
const SEEDS_PATH = '/../objection/seeds';

export default class ObjectionORM implements ORM {
  knexConnection: any;

  constructor() {
    const knexConfig = config.knex as any;
    knexConfig.migrations.directory = `${__dirname}${MIGRATION_PATH}`;
    knexConfig.seeds.directory = `${__dirname}${SEEDS_PATH}`;

    this.knexConnection = Knex(knexConfig);
  }

  async connect(runSeed: boolean = false) {
    Model.knex(this.knexConnection);

    dbLogger.info('Running knex migrations...');
    await this.knexConnection.migrate.latest();
    dbLogger.info('Done running knex migrations.');

    if (!runSeed) {
      return;
    }

    dbLogger.info('Running knex seeds...');
    await this.knexConnection.seed.run(config.knex.seeds);
    dbLogger.info('Done running knex seeds.');
  }

  async disconnect() {
    return this.knexConnection?.destroy();
  }
}
