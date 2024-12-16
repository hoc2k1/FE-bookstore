export const checkNotEmpty = (value, checkNumber = false) => {
  if (checkNumber && value == 0) {
    return true
  }
  else if (value) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return true
      }
      else {
        return false
      }
    }
    else if (typeof value === 'object') {
      if (Object.keys(value).length > 0) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return true
    }
  }
  else {
    return false
  }
}