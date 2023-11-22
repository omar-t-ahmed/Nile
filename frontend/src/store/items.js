export const RECEIVE_ITEMS = 'items/RECEIVE_ITEMS'
export const RECEIVE_ITEM = 'items/RECEIVE_ITEM'
export const SEARCH_ITEMS = 'items/SEARCH_ITEMS';


export const receiveItems = (items) => ({
    type: RECEIVE_ITEMS,
    items
})

export const receiveItem = (item) => ({
    type: RECEIVE_ITEM,
    item
})

export const searchItems = (items) => ({
    type: SEARCH_ITEMS,
    items,
});

export const getItems = (state) => {
    return state?.items ? Object.values(state.items) : []
}

export const getItem = (itemId) => (state) => {
    return state?.items ? state.items[itemId] : null
}

export const fetchItems = () => async dispatch => {
    const res = await fetch('/api/items')

    if (res.ok) {
        const items = await res.json()
        dispatch(receiveItems(items))
    }
}

export const fetchItem = (itemId) => async dispatch => {
    const res = await fetch(`/api/items/${itemId}`)
    if (res.ok) {
        const item = await res.json()
        dispatch(receiveItem(item))
    }
}


export const fetchSearchItems = (searchQuery) => async (dispatch) => {
    const res = await fetch(`/api/items/search?search=${searchQuery}`);

    if (res.ok) {
        const items = await res.json();
        dispatch(searchItems(items));
    } else {
        console.error("Error fetching search results:")
    }
};



const itemsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_ITEMS:
            return {...action.items}
        case RECEIVE_ITEM:
            return {...state, [action.item.id] : action.item}
        case SEARCH_ITEMS:
            return { ...action.items };
        default:
            return state
        }
}

export default itemsReducer