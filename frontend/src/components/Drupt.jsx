import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../featurs/slice/cartSlice";

const Drupt = () => {
  const count = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <h1>{count}</h1>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Drupt;
