import { CategoryTypes } from '../enums/productsEnum'

export interface Product {
  id: string
  sku: number
  name: string
  price: string
  category: CategoryTypes
}
