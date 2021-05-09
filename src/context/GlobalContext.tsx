import React, { ReactChildren, ReactChild } from 'react'
import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

enum CategoryTypes {
  milk,
  sweet,
  yogurt
}

interface Product {
  sku: number
  name: string
  price: string
  category: CategoryTypes | string
}

interface AuxProps {
  children: ReactChild | ReactChildren
}

const initialState = {
  products: [
    {
      sku: 'TSH-MED-WHI-COT',
      name: 'Cake',
      price: 25.99,
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

  const deleteProduct = () => {}

  const editProduct = () => {}

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
