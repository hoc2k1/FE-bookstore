
exports.setToken = (token) => {
  localStorage.setItem('token', token)
}
exports.removeToken = () => {
  localStorage.removeItem('token')
}
exports.getToken = () => {
  return localStorage.getItem('token')
}
exports.setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}
exports.getUser = () => {
  if (!localStorage.getItem('user'))
    return null
  return JSON.parse(localStorage.getItem('user'))
}
exports.clear = () => {
  localStorage.clear()
}
exports.setCartId = (cart_id) => {
  localStorage.setItem('cart_id', cart_id)
}
exports.getCartId = () => {
  if (!localStorage.getItem('cart_id'))
    return null
  return localStorage.getItem('cart_id')
}
exports.removeCartId = () => {
  localStorage.removeItem('cart_id')
}