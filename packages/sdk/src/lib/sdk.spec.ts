jest.mock('@vueuse/core', () => ({
  createSharedComposable: jest.fn((fn) => () => fn()),
}));

jest.mock('@vue-storefront/magento-sdk', () => ({
  magentoModule: jest.fn(),
  MagentoModuleType: jest.fn(),
}));

jest.mock('@vue-storefront/sdk', () => ({
  initSDK: jest.fn(() => 'mockedSdk'),
  buildModule: jest.fn(() => 'mockedModule'),
}));

import { useSdk } from 'sdk';

describe('useSdk', () => {
  it('should work', () => {
    const result = useSdk();
    expect(result).toBeDefined();
  });
});
