import { createServer } from '@vue-storefront/middleware';
import consola from 'consola';
import config from '../middleware.config';

(async () => {
  const app = await createServer({ integrations: config.integrations });
  const host = process.argv[2] ?? '127.0.0.1';
  const port = Number(process.argv[3]) || 4000;

  app.listen(port, host, () => {
    consola.success(`API server listening on http://${host}:${port}`);
  });
})();
