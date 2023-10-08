import { useSdk } from 'sdk';
import { CmsBlocksResponse, CmsBlockQuery } from '@vue-storefront/magento-sdk';
import { CmsBlocksInputType } from './types';
import { storeToRefs } from 'pinia';
import { AppConfigCMS, BlockItem } from '../../types/index';

/**
 * @description Composable for managing content from CMS.
 * @param payload request Payload.
 * @param autoInit auto fetch data from server.
 * @returns {@link UseContent}
 * const { data, loading, getCmsBlocks } = useCmsBlock<ContentFieldsType>('identifiers');
 */

export const useCmsBlocks = () => {
  // const appConfig = useAppConfig() as { cms: AppConfigCMS };
  const appConfig = useAppConfig() as unknown as { cms: AppConfigCMS };

  const cmsBlockStore = useCmsBlockStore();

  // Use storeToRefs to make the state properties reactive
  const { items, loading, blocksData } = storeToRefs(cmsBlockStore);

  const getCmsBlocks = async (payload: CmsBlocksInputType) => {
    const { page = null, identifiers = null, includeDefaults = false } = payload;
    cmsBlockStore.setLoading(true);
    // console.log('methodGetsHitOnPageLoad',payload);
    try {
      //Get the CMS blocks Configurations
      let cmsBlockPageMapping = appConfig.cms?.blocks;

      // console.log('cmsBlock>>cmsBlockPageMapping', cmsBlockPageMapping)

      //If CMS Blocks not defined in config, and no identifiers has been requested then return;
      if (!cmsBlockPageMapping && !identifiers) {
        // console.log('cmsBlock>>cmsBlockPageMapping', cmsBlockPageMapping)
        return;
      }

      // Initialize with defaults if required
      let cmsBlockIdentifiers = includeDefaults ? (cmsBlockPageMapping?.default ?? []) : [];

      // console.log('cmsBlock>>cmsBlockIdentifiers', cmsBlockPageMapping)

      // Add page-specific identifiers if page is defined in appConfig
      if (page && cmsBlockPageMapping?.pages?.[page]) {
        cmsBlockIdentifiers.push(...cmsBlockPageMapping.pages[page]);
        // cmsBlockIdentifiers = [...cmsBlockIdentifiers, ...cmsBlockPageMapping.pages[page]];
      }

      // console.log('weDoHaveAnIdentifier');

      // Add identifiers passed as arguments
      if (identifiers) {
        cmsBlockIdentifiers.push(...(Array.isArray(identifiers) ? identifiers : [identifiers]));
        // if (typeof identifiers === 'string') {
        //   cmsBlockIdentifiers.push(identifiers);
        // } else {
        //   cmsBlockIdentifiers.push(...identifiers);
        //   // cmsBlockIdentifiers = [...identifiers, ...cmsBlockIdentifiers];
        // }
      }

      // console.log('weDoHaveAnIdentifier', cmsBlockIdentifiers);

      const { $generateUniqueKey } = useNuxtApp()

      // Generate unique key for this query
      const uniqueKey: string = $generateUniqueKey({
        page: payload.page,
        cmsBlockIdentifiers,
        includeDefaults: payload.includeDefaults
      });

      // console.log('uniqueKey', uniqueKey);

      // Check if data already exists in store
      const cachedData = blocksData.value[uniqueKey];

      // console.log('uniqueKey::CachedData', cachedData);

      if (cachedData) {
        //check if we have those cms blocks already in store.
        const fetchedCachedData = cmsBlockStore.getBlocksData(cachedData);

        // No need to send query then to fetch more, as we already have it in state
        if (Array.isArray(fetchedCachedData) && fetchedCachedData.length) {
          return false;
        }
      }

      //Fetching data.
      // const responseTry = await useSdk().magento.cmsBlocks({
      //   identifiers: cmsBlockIdentifiers
      // });

      // console.log('responseTry',responseTry);
      //test

      const { data, error } = await useAsyncData<CmsBlocksResponse>('fetch-cms-blocks', () => useSdk().magento.cmsBlocks({
        identifiers: cmsBlockIdentifiers
      }))

      const fetchedCmsBlocks = data?.value?.data?.cmsBlocks?.items;
      if (fetchedCmsBlocks) {
        const mappedDataForState =
          fetchedCmsBlocks?.filter((blockItem) => !!blockItem)?.map((blockItem): BlockItem => {
            const nonNullBlockItem = blockItem!;
            return {
              identifier: nonNullBlockItem.identifier!,
              block: nonNullBlockItem
            }
          })
        cmsBlockStore.setItems(mappedDataForState);
        // set the data to the store as well to be cached.
        cmsBlockStore.setBlocksData(uniqueKey, cmsBlockIdentifiers);
      }
      return data;
    } catch (error) {
      console.log('There is an Error');
      throw new Error(error as string);
    } finally {
      cmsBlockStore.setLoading(false);
    }
  };

  return {
    getCmsBlocks,
    data: items,
    loading
  };
};
