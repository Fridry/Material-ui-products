/* eslint-disable import/no-anonymous-default-export */
import { Product } from '../ts/interfaces/productsInterfaces'

export default (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        products: [action.payload, ...state.products]
      }

    case 'EDIT_PRODUCT':
      const updatedProduct = action.payload
      const updatedProducts = state.products.map((product: Product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct
        }

        return product
      })
      return {
        products: updatedProducts
      }

    case 'DELETE_PRODUCT':
      return {
        products: state.products.filter((product: Product) => {
          return product.id !== action.payload
        })
      }

    default:
      return state
  }
}
