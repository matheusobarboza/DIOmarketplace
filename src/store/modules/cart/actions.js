export default function addToCartRequest( id ) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  }
}

export default function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  }
}
