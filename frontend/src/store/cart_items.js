import csrfFetch from "./csrf"

export const RECEIVE_CART_ITEMS = 'cart_items/RECEIVE__CART_ITEMS'
export const RECEIVE_CART_ITEM = 'cart_items/RECEIVE__CART_ITEM'
export const REMOVE_CART_ITEM = 'cart_items/REMOVE__CART_ITEM'
export const TOGGLE_CART_ITEM = 'TOGGLE_CART_ITEM';
export const REMOVE_CART_ITEMS = 'cart_items/REMOVE_ALL_CART_ITEMS';



export const receiveCartItem = (cartItem) => ({
    type: RECEIVE_CART_ITEM,
    cartItem
})

export const removeCartItem = (cartItemId) => ({
    type: REMOVE_CART_ITEM,
    cartItemId
})

export const toggleCartItem = (itemId) => ({
    type: TOGGLE_CART_ITEM,
    itemId
});

export const receiveCartItems = (cartItems) => ({
    type: RECEIVE_CART_ITEMS,
    cartItems
})

export const removeCartItems = (cartItemIds) => ({
    type: REMOVE_CART_ITEMS,
    cartItemIds,
});


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
        dispatch(removeCartItem({cartItemId}))
    }
}

export const deleteAllCartItems = (checkedItems) => async (dispatch) => {
    let cartItemIds = checkedItems?.map((item) => item.id);
    const res = await csrfFetch('/api/cart_items/delete-multiple', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItemIds),
    });

    if (res.ok) {
        dispatch(removeCartItems(cartItemIds));
    }
};

const cartItemsReducer = (state = {}, action) => {
    let newState = {...state}

    switch(action.type) {
        case RECEIVE_CART_ITEMS:
            return {...action.cartItems}
        case RECEIVE_CART_ITEM:
            return {...state, [action.cartItem.id] : action.cartItem}
        case REMOVE_CART_ITEM:
            delete newState[action.cartItemId]
            return newState
        case TOGGLE_CART_ITEM:
            const itemId = action.itemId
            return {...state, [itemId]: {...state[itemId], isChecked: !state[itemId]?.isChecked}};
        case REMOVE_CART_ITEMS:
            return Object.fromEntries(Object.entries(state).filter(([key]) => !action.cartItemIds.includes(parseInt(key))));
        default:
            return state
        }
}

export default cartItemsReducer