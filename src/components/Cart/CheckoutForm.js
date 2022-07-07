import { useState } from "react";
import Cart from "./Cart";

const CheckoutForm = (props) => {
  const [cancle, setCancle] = useState(true);

  const handleCancle = () => {
    setCancle(false);
  };

  if (!cancle) {
    return <Cart />;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name"></input>
        <label htmlFor="name">Phone Number</label>
        <input type="text" id="name" name="name"></input>
        <button onClick={confirmHandler}>Confirm</button>
        <button type="button" onClick={props.onCancle}>
          Cancle
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
