import { config } from 'dotenv';

config();

export const envConfig = {
  URL_MONGO: process.env.URL_MONGO!,
};
