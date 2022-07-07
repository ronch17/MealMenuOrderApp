import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formBtns, setFormBtns] = useState(true);
  const [handleError, setHandleError] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://ron-first-react-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
      if (!response.ok) {
        throw new Error(`something went wrong, please try again`);
      }
    } catch (error) {
      console.error(error);
      setHandleError(error.message);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const openCheckout = () => {
    setOrder(true);
    setFormBtns(false);
  };

  const cartModalContent = (
    <React.Fragment>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && <Checkout onConfirm={submitHandler} onCancle={props.onClose} />}
      {!isSubmitting && <h3>{handleError}</h3>}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      {" "}
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      <div className={classes.actions}>
        {formBtns && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {hasItems && formBtns && (
          <button className={classes.button} onClick={openCheckout}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
