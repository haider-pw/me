import * as dotenv from 'dotenv';
import * as path from 'path';
const envPath = path.resolve(process.cwd(), '../../.env');
dotenv.config({ path: envPath });

export interface Config {
  VSF_API_ENDPOINT: string;
  [key: string]: any;  // This is the index signature
}

export const config: Config = {
  VSF_API_ENDPOINT: process.env['VSF_API_ENDPOINT'] || 'http://127.0.0.1:4000/magento',
  VSF_MAGENTO_BASE_URL: process.env['VSF_MAGENTO_BASE_URL'],
  VSF_MAGENTO_GRAPHQL_URL: process.env['VSF_MAGENTO_GRAPHQL_URL']
};
