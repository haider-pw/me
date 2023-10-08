import { magentoModule, MagentoModuleType } from '@vue-storefront/magento-sdk';
import { initSDK, buildModule } from '@vue-storefront/sdk';
import { createSharedComposable } from '@vueuse/core';

export const useSdk = createSharedComposable(() => {
  const sdkConfig = {
    magento: buildModule<MagentoModuleType>(magentoModule, {
      apiUrl: 'http://127.0.0.1:4000/magento',
    }),
  };

  return initSDK<typeof sdkConfig>(sdkConfig);
});
