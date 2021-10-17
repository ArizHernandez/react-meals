import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isDumpShowed, setIsDumpShowed] = useState(false);
  
  const { totalAmount, items } = cartCtx;
  
  const btnClasses = `${classes.badge} ${isDumpShowed ? classes.bump : ""}`;
  
  const numberOfCartItems = items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  useEffect(() => {
    if (items.length === 0) return;

    setIsDumpShowed(true);

    const identity = setTimeout(() => {
      setIsDumpShowed(false);
    }, 300);

    return () => {
      clearTimeout(identity);
    };
  }, [totalAmount, items]);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={btnClasses}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
