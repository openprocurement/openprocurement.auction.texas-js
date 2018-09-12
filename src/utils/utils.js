export default {
  getAuthorizeAxiosConfig(accessToken) {
    let config = {
      headers: {
        'Authorization': "Bearer " + accessToken
      }
    }
    return config
  },
  filterEmptyFields (component, fields) {
    let result = {}
    fields.forEach(field => {
      if (component[field]) {
        result[field] = component[field]
      }
    })
    return Object.keys(result).length == 0 ? null : result
  }
}
