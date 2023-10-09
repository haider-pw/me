import { config } from 'shared-config/src/lib/shared-config';

describe('shared-config', () => {
  it('should have required environment variables defined', () => {

    // Replace 'REQUIRED_ENV_VARIABLE1' and 'REQUIRED_ENV_VARIABLE2'
    // with the names of the environment variables you want to check
    const requiredVariables = ['VSF_API_ENDPOINT', 'VSF_MAGENTO_BASE_URL', 'VSF_MAGENTO_GRAPHQL_URL'];

    console.log('configWouldBe', config);

    for (const variable of requiredVariables) {
      expect(config).toHaveProperty(variable);
      expect(config[variable]).toBeTruthy();
    }
  });
});
