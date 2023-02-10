import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `${__dirname}/../../${process.env.NODE_ENV}.env` });

const env = process.env.NODE_ENV || 'development';
const port = +process.env.PORT || 3000;

export default {
  env,
  port,
};
