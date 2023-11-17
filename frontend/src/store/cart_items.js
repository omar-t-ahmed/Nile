import csrfFetch from "./csrf"

export const RECEIVE_CART_ITEMS = 'items/RECEIVE__CART_ITEMS'
export const RECEIVE_CART_ITEM = 'items/RECEIVE__CART_ITEM'
export const REMOVE_CART_ITEM = 'items/REMOVE__CART_ITEM'


export const receiveCartItems = (cartItems) => ({
    type: RECEIVE_CART_ITEMS,
    cartItems
})

export const receiveCartItem = (cartItem) => ({
    type: RECEIVE_CART_ITEM,
    cartItem
})

export const removeCartItem = (cartItemId) => ({
    type: REMOVE_CART_ITEM,
    cartItemId
})


// export const getCartItems = (state) => {
//     return state.currentUser? Object.values(currentUser.cartItems) : []
// }

// export const getCartItem = (itemId) => (state) => {
//     return state.currentUser? currentUser.cartItems[itemId] : null
// }

export const fetchCartItems = () => async dispatch => {
    const res = await csrfFetch('/api/cart_items')

    if (res.ok) {
        const cartItems = await res.json()
        dispatch(receiveCartItems(cartItems))
    }
}

export const createCartItem = (cartItem) => async dispatch => {
    const res = await csrfFetch(('/api/cart_items'), {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(cartItem)
    })

    if (res.ok) {
        const cartItem = await res.json()
        dispatch(receiveCartItem(cartItem))
    }
}

export const fetchCartItem = (cartItemId) => async dispatch => {
    const res = await csrfFetch(`/api/cart_items/${cartItemId}`)
    if (res.ok) {
        const cartItem = await res.json()
        dispatch(receiveCartItem(cartItem))
    }
}

export const deleteCartItem = (cartItemId) => async dispatch => {
    const res = await csrfFetch((`/api/cart_items/${cartItemId}`), {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeCartItem(cartItemId))
    }
}

const cartItemsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_CART_ITEMS:
            return {...action.cartItems}
        case RECEIVE_CART_ITEM:
            return {...state, [action.cartItem.id] : action.cartItem}
        case REMOVE_CART_ITEM:
            const newState = {...state}
            delete newState[action.cartItemId]
            return newState
        default:
            return state
        }
}

export default cartItemsReducer