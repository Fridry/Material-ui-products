// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        products: [action.payload, state.product]
      }

    default:
      return state
  }
}
