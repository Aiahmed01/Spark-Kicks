import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {

  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    // <div className="card px-1 py-1">
    //   <Link to={`/products/${_id}`}>
    //     <img
    //       alt={name}
    //       src={`/images/${image}`}
    //     />
    //     <p>{name}</p>
    //   </Link>
    //   <div>
    //     <div>{quantity} {pluralize("item", quantity)} in stock</div>
    //     <span>${price}</span>
    //   </div>
    //   <button onClick={addToCart}>Add to cart</button>
    // </div>

    // --------Old start here 
    <div className="border-2 rounded-lg border-gray-300 h-32 md:h-64 m-4">
    <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg h-32 md:h-64 text-center">
    <Link to={`/products/${_id}`}>
  <img
    alt={name}
    src={`/images/${image}`  
  }
  height={200} width={200}
  />
  </Link>
  <div>
  <div>{quantity} {pluralize("item", quantity)} in stock</div>
  <span>${price}</span>
</div>
<button  onClick={addToCart}>Add to cart</button>
      
    </div>
    </div>

  );
}
//className="bg-gray-300 hover:bg-blue-500 hover:text-white"
export default ProductItem;
