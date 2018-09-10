export default {
  isNumberValidation (value) {
    if (!value) {
      return true
    }
    let validated = parseFloat(value)
    if (isNaN(validated) || validated.toString().length != value.toString().length) {
      return false
    }
    return true
  }
}