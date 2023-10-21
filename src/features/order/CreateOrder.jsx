import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder, updateOrder } from "../../services/apiRestaurant";
import {store} from "../../store";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

export default function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const { orderId, userDetail } = useSelector((store) => store.cart);
  const [withPriority, setWithPriority] = useState(false);
  // const [withPriority, setWithPriority] = useState(() => userDetail? userDetail.priority : false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const totalCartPrice = useSelector(getTotalCartPrice);
  console.log(totalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isLoadingAddress = addressStatus === "loading";
  const [pin, setPin] = useState(userDetail? userDetail.pin : "");

  /*---------------Editing Orders--------------- */
  // const oldOrder = useLoaderData();
  // const order = oldOrder[0];
  // console.log(order);
  // const cartToEdit = JSON.parse(order.cart);
  // console.log(cartToEdit[0]);
  // function handleGoToCart() {
  //   dispatch(addItem(cartToEdit[0]));
  // }
  // const cartStore = useSelector(getCart);
  // console.log(cartStore);
  /*---------------Editing Orders--------------- */

  function handleFourDigits(e) {
    let value = e.target.value;
    
    // Remove non-numeric characters
    value = value.replace(/\D/g, "");
    
    // Limit input to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    setPin(value);
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6 ">
      <h2 className="mb-8 text-xl font-semibold">
        {orderId
          ? "Updated your order? Let's go!"
          : "Ready to order? Let's go!"}
      </h2>

      <Form method={`${orderId ? "PATCH" : "POST"}`}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={`${userDetail ? userDetail.customer : username}`}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              required
              defaultValue={`${userDetail ? userDetail.phone : ""}`}
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input w-full"
            />
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute bottom-1 right-1 z-50 sm:right-1">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>{" "}
            </span>
          )}
        </div>
        {addressStatus === "error" && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700">
            {errorAddress}
          </p>
        )}

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="pin" className="sm:basis-40 ">
            Pin
          </label>
          <input
            type="number"
            className="input grow"
            name="pin"
            max={9999}
            value={pin}
            required
            onChange={handleFourDigits}
          />
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="priorityPrice"
          value={JSON.stringify(priorityPrice)}
        />
        <input
          type="hidden"
          name="pizzaPrice"
          value={JSON.stringify(totalCartPrice)}
        />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude}, ${position.longitude}`
              : ""
          }
        />
        <input type="hidden" name="totalPrice" value={totalPrice} />
        {orderId ? <input type="hidden" name="id" value = {`${orderId ? orderId : ""}`}/> : ""}

        <div>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order"
              : orderId ? `Update now for ${formatCurrency(totalPrice)}` : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
    id: data.id && Number(data.id),
    // totalCartPrice: data.totalCartPrice
    
    // status: "preparing",
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please provide your correct phone number as we might need it to contact you!😊";
  if (Object.keys(errors).length > 0) return errors;

     console.log(order)
    if(order.id) {
      const {customer, address, pin, cart, phone, pizzaPrice, position, priorityPrice, totalPrice} = order
      const updatedOrderMinusId= {customer, address, pin, cart, phone, pizzaPrice, position, priorityPrice, totalPrice}
       
      console.log(updatedOrderMinusId)
      const newOrder = await updateOrder(order.id, updatedOrderMinusId) 
      console.log(newOrder);
      store.dispatch(clearCart());
      return redirect(`/order/${order.id}`);

    } else {
      const newOrder = await createOrder(order) 
      console.log(newOrder);
      store.dispatch(clearCart());
      return redirect(`/order/${newOrder}`);
    }
  

  
  // const newOrder = await createOrder(order);

  //Hacky approach, DO NOT overuse this
  // return redirect(`/menu`);
}
