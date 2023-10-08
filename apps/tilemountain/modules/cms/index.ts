// modules/cms/index.ts
import { defineNuxtModule, addServerHandler, addPlugin } from 'nuxt/kit'
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

export default defineNuxtModule({
  meta: {
    name: 'magento-sdk-cms',
    configKey: 'cms',
    requires: ['@pinia/nuxt']
  },
  setup (options, nuxt) {

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    // nuxt.options.build.transpile.push(runtimeDir)
    // addPlugin(resolve(runtimeDir, 'cms.plugin.ts'))

    // Auto register components
    // nuxt.hook('components:dirs', (dirs) => {
    //   dirs.push({
    //     path: join(runtimeDir, 'components')
    //   })
    // })

    // Auto register composables
    nuxt.hook('imports:dirs',(dirs)=>{
      dirs.push(resolve(runtimeDir, 'composables'))
      dirs.push(resolve(runtimeDir, 'stores'))
    })

    // Auto register pages
    // nuxt.hook('pages:extend', (pages) => {
    //   pages.push({
    //     name: 'blog-page',
    //     path: '/blog/:id',
    //     file: resolve(__dirname, './pages/blog/[id].vue')
    //   })
  }
})


