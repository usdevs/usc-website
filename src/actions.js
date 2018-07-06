export const CACHE_IMAGEURL = 'CACHE_IMAGEURL'

export function cacheImageURL(imageURL) {
  return { type: CACHE_IMAGEURL, payload: imageURL }
}
