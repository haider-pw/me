export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      generateUniqueKey: (params: Record<string, any> = {}): string => {
        return JSON.stringify(params);
      }
    }
  }
})
