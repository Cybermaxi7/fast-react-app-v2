import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById, updateIngredients } from "./cartSlice";
import { useState } from "react";

function CartItem({ item }) {
  const { pizzaId, name, quantity,ingredients, totalPrice } = item;
  console.log(ingredients)
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))
  const [editedIngredients, setEditedIngredients] = useState(ingredients)
  function handleAddIngredients() {
    const ingredientsArray = editedIngredients?.split(",").filter(item => item)
    dispatch(updateIngredients(ingredientsArray, pizzaId))
    console.log(editedIngredients)
  }
  console.log(editedIngredients)
  return (
    <li className="sm:justify-between py-3 sm:flex gap-4 sm:items-center">
      <p className="mb-1 sm:mb-0 w-fit font-semibold">
        {quantity}&times; {name}
      </p>
      
      <input type="text" className="self-end bg-transparent outline-none w-full flex" value={editedIngredients} onChange={(e) => setEditedIngredients(e.target.value)} autoFocus onBlur={handleAddIngredients} />
      <div className="flex items-center justify-between sm:gap-6 mt-2">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>

  );
}

export default CartItem;
