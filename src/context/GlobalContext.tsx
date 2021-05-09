import { ReactChildren, ReactChild } from 'react'
import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

import { Product } from '../ts/interfaces/productsInterfaces'

interface AuxProps {
  children: ReactChild | ReactChildren
}

const initialState = {
  products: [
    {
      id: '6baf9f52-7113-4bdf-a8dc-da1f7d375919',
      sku: 123,
      name: 'Cake',
      price: '25.99',
      category: 'sweet'
    }
  ]
}

export const GlobalContext = createContext<any>(initialState)

export const GlobalProvider = ({ children }: AuxProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  //Actions
  const addProduct = (product: Product) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product
    })
  }

  const deleteProduct = (id: string) => {
    dispatch({
      type: 'DELETE_PRODUCT',
      payload: id
    })
  }

  const editProduct = (product: Product) => {
    dispatch({
      type: 'EDIT_PRODUCT',
      payload: product
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        addProduct,
        editProduct,
        deleteProduct
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
