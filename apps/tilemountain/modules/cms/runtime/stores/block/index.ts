import { defineStore, StoreDefinition } from 'pinia';
import { CmsBlockState, BlockItem } from '../../types/index'

export const useCmsBlockStore: StoreDefinition<'cmsBlockStore', CmsBlockState> = defineStore<'cmsBlockStore', CmsBlockState>('cmsBlockStore', {
  state: (): CmsBlockState => ({
    loading: false,
    items: [],
    blocksData: {}
  }),
  getters: {
    getAllCachedCmsBlocks (state) {
      return state.items;
    }
  },
  actions: {
    setLoading (newLoadingState: boolean) {
      this.loading = newLoadingState;
    },
    setItems (items: BlockItem[]) {
      this.items = items;
    },
    setBlocksData (key: string, data: string[]) {
      this.blocksData[key] = data;
    },
    getBlocksData (identifiers: string[]) {
      return this.items.filter((item) => {
        return identifiers.includes(item.identifier)
      });
    }
  }
});
