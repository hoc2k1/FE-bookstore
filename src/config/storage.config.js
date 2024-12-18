
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
exports.getCart = () => {
  if (!localStorage.getItem('cart'))
    return null
  return JSON.parse(localStorage.getItem('cart'))
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
exports.removeCart = () => {
  localStorage.removeItem('cart')
}
exports.addProductToCart = (product) => {
  let cart
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'))
  } else {
    cart = []
  }
  let index = cart.findIndex(element => product._id === element._id)
  if (index === -1) {
    cart = [...cart, product]
  } else {
    cart[index].count = parseInt(cart[index].count) + parseInt(product.count)
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}
exports.updateProductInCart = (product) => {
  let cart = this.getCart()
  if (!cart) {
    return false
  }
  let index = cart.findIndex(element => product._id === element._id)
  if (index === -1) {
    return false
  } else {
    cart[index].count = product.count
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  return true
}
exports.deteleProductInCart = (id_product) => {
  let cart = this.getCart()
  if (!cart) {
    return false
  }
  let index = cart.findIndex(element => id_product === element._id)
  if (index === -1) {
    return false
  } else {
    cart.splice(index, 1)
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  return true
}