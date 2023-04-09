import https from '@/utils/request'
export const exampleApi = async () => {
  return await https.get('example')
}
