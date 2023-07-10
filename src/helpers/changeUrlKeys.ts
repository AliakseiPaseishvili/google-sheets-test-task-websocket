export default (url, urlKeys = {}) => {
  const keys = Object.keys(urlKeys).map(key => ({ urlKey: `:${key}`, value: urlKeys[key] }))
  
  return keys.reduce((url, { urlKey, value }) => url.replace(urlKey, value) , url)
};
