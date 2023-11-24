# Welcome to Nile

[Nile](https://nile-qp51.onrender.com/) is a full-stack web application, which replicates the core features of Amazon.com. Browse an extensive product collection with smart filtering options, add items to your cart, and effortlessly checkout when ready. Elevate your online shopping experience with Nile!

## Technologies used

In building my application I utilized a combination of Ruby on Rails, Postgres, React, Redux, JavaScript, AWS, HTML, and CSS. The backend is powered by Ruby on Rails,PostgreSQL serves as the relational database management system for structured data storage. On the frontend, I utilized React, a JavaScript library for building user interfaces, and Redux for state management. I also used AWS S3 to store seed files and images, which are fethced upon render. Lastly, I used HTML for structuring content and CSS for styling.

## Features
### Carts

Users can add, update quantities, and delete items from their cart. When adding items to the cart they will see the number of items update in the top right. When a user is on the cart page they can choose which items they would like to checkout manually or with the select all items button. Their subtotal and number of items is then reflected on the right and they can proceed to checkout. When users logout, their carts are stored in the backend until their next login.

```
const cart_items = useSelector((state) => state?.cart_items ? Object.values(state.cart_items) : []);
const checkedItems = cart_items.filter(item => item?.isChecked);

const handleSelectAll = () => {
    const cartItemIds = cart_items.map((item) => item.id);
    dispatch(selectAllCartItems(cartItemIds));
}

const selectAllButtonText = cart_items.every((item) => item.isChecked) ? 'Deselect all items' : 'Select all items'; // used to either select or deselect all items

const subtotal = checkedItems.reduce((acc, cart_item) => {
    const itemPrice = items[cart_item.itemId].price || 0
    return acc + cart_item.quantity * itemPrice;
}, 0); // items only added to subtotal if checked

const numItems = checkedItems.reduce((acc, cart_item) => {
    return acc + cart_item.quantity
}, 0) // items only added to numItems if checked
```

## Future technologies

* search
* categories
* saved lists