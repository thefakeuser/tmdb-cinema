export default function ({ $axios }: { $axios: any }) {
  $axios.onRequest((config: any) => {
    config.params = { ...config.params, api_key: process.env.API_KEY }

    return config
  })
}
