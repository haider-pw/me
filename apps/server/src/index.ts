import { createServer } from '@vue-storefront/middleware';
import consola from 'consola';
import config from '../middleware.config';


// Export this function so it can be reused in api/vercel.ts
export async function getInitializedApp() {
  return await createServer({ integrations: config.integrations });
}

// Local/server environment
if (config.server_mode !== 'SERVERLESS') {
  (async () => {
    const app = await getInitializedApp();
    const host = process.argv[2] ?? '127.0.0.1';
    const port = Number(process.argv[3]) || 4000;

    app.listen(port, host, () => {
      consola.success(`API server listening on http://${host}:${port}`);
    });
  })();
}


