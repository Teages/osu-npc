// Thanks to https://github.com/gbicou/nuxt3-urql/blob/main/plugins/urql.ts but with some modifications.
import type { Client, SSRData } from '@urql/core'
import { cacheExchange, createClient, fetchExchange, ssrExchange } from '@urql/core'

const ssrKey = '__URQL_DATA__'

export default defineNuxtPlugin((nuxt) => {
  const { vueApp } = nuxt

  // const config = useRuntimeConfig()
  // const url = 'http://localhost:3000/graphql'
  const url = '/graphql'

  const ssr = ssrExchange({
    isClient: process.client,
  })

  if (process.client) {
    // when app is created in browser, restore SSR state from nuxt payload
    nuxt.hook('app:created', () => {
      ssr.restoreData(nuxt.payload[ssrKey] as SSRData)
    })
  }

  if (process.server) {
    // when app has rendered in server, send SSR state to client
    nuxt.hook('app:rendered', () => {
      nuxt.payload[ssrKey] = ssr.extractData()
    })
  }

  const client = createClient({
    url,
    exchanges: [
      cacheExchange,
      ssr,
      // ofetchExchange,
      fetchExchange,
    ],
    fetchOptions: () => {
      const cookie = useRequestHeaders().cookie
      return {
        headers: {
          cookie,
        },
        credentials: 'include',
      }
    },
    fetch: (input, init) => $fetch.raw(input as string, {
      ...init as any,
      responseType: 'stream', // don't use the body
    }),
  })

  nuxt.provide('urql', client)
  vueApp.provide('$urql', client)
})

declare module '#app' {
  interface NuxtApp {
    $urql: Client
  }
}
