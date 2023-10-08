// https://nuxt.com/docs/api/configuration/nuxt-config
import { join } from 'path';
import { workspaceRoot } from '@nx/devkit';

/**
 * read the compilerOptions.paths option from a tsconfig and return as aliases for Nuxt
 **/
function getMonorepoTsConfigPaths(tsConfigPath: string) {
  const tsPaths = require(tsConfigPath)?.compilerOptions?.paths as Record<
    string,
    string[]
  >;

  const alias: Record<string, string> = {};
  if (tsPaths) {
    for (const p in tsPaths) {
      // '@org/something/*': ['libs/something/src/*'] => '@org/something': '{pathToWorkspaceRoot}/libs/something/src'
      alias[p.replace(/\/\*$/, '')] = join(
        workspaceRoot,
        tsPaths[p][0].replace(/\/\*$/, '')
      );
    }
  }

  return alias;
}

export default defineNuxtConfig({
  debug: true,
  typescript: {
    typeCheck: true
  },
  appConfig: {
    titleSuffix: 'Tile Mountain demo app'
  },
  imports: {
    dirs: ['stores', 'composables/**', 'utils/**']
  },
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'VSF x Nuxt3 (Boilerplate)' },
        { name: 'theme-color', content: '#018937' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' }
      ]
    }
  },
  modules: ['@pinia/nuxt'],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
    ],
  },
  /**
   * aliases set here will be added to the auto generate tsconfig by Nuxt
   * https://nuxt.com/docs/guide/directory-structure/tsconfig
   **/
  alias: getMonorepoTsConfigPaths('../../tsconfig.base.json'),
  devtools: { enabled: true }
})
