export default {
    getProperTime (date) {
        return new Date(Date.UTC(
            date.getFullYear(), 
            date.getMonth(), 
            date.getDate(), 
            date.getHours(), 
            date.getMinutes())
        )   
    },
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
