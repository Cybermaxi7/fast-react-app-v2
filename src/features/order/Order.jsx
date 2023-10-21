// Test ID: IIDSAT
import { getOrder } from "../../services/apiRestaurant";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetcher, useLoaderData } from "react-router-dom";
import Button from "../../ui/Button";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { addItem, editOrder, getCart } from "../cart/cartSlice";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
// "2023-10-18T23:37:20.713764"

//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const [showModal, setShowModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const {
    id,
    status,
    priority,
    priorityPrice,
    pizzaPrice,
    estimatedDelivery,
    cart,
    address,
    customer,
    phone,
    pin,
    position,
    created_at,
  } = order[0] 
  // console.log(created_at);
  console.log(order[0])
  const cartToEdit = JSON.parse(cart);
  const userDetail = { address, customer, phone, pin, position, priority };
  function handlePin(e) {
    let value = e.target.value;

    // Remove non-numeric characters
    value = value.replace(/\D/g, "");

    // Limit input to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    setPinInput(value);
  }

  function handleEditOrder() {
    if (pin === Number(pinInput)) {
      dispatch(editOrder(cartToEdit, id, userDetail));
      setEdit((edit) => !edit);
      setShowModal(!showModal);
    } else {
      alert(
        "Please Enter the correct pin you setup initially when placing the order",
      );
    }
  }

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  useEffect(
    function () {
      console.log(fetcher.data)
      if (!fetcher.data && fetcher.state === "idle")
        return fetcher.load("/menu");
    },
    [fetcher],
  );

 useEffect(() => {
    // Simulated created_at timestamp
    const createdDate = new Date(created_at);
    createdDate.setHours(createdDate.getHours() + 1);
    const currentTime = new Date() 
    // console.log("createdDate", createdDate)
    // console.log("currentTime", currentTime)

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - createdDate;
    console.log(timeDifference);

    if (timeDifference > 5 * 60 * 1000) {
      // More than 5 minutes have passed, hide the button
      setEdit(false);
    }
  }, [created_at]);


  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b">
        {JSON.parse(cart).map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              item.ingredients
            }
            isLoadingIngredients={fetcher.state === "loading"}
          />
        ))}
      </ul>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target.classList.contains("bg-black"))
              setShowModal(!showModal);
          }}
        >
          <div className="absolute inset-0 m-auto flex h-64 w-64 flex-col justify-between  rounded-lg bg-white p-6">
            <div className="mt-4 text-center">
              <label htmlFor="pin" className="mb-2 block text-lg font-bold">
                Enter your pin
              </label>
              <input
                type="number"
                className="w-full rounded border p-2 focus:border-blue-500 focus:outline-none focus:ring"
                name="pin"
                max={9999}
                value={pinInput}
                required
                onChange={handlePin}
              />
            </div>
            <Button type="primary" onClick={handleEditOrder}>
              {" "}
              Confirm Pin
            </Button>
          </div>
        </div>
      )}

      {edit && (
        <Button type="primary" onClick={() => setShowModal(!showModal)}>
          Edit Order
        </Button>
      )}

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-stone600 text-sm font-medium">
          Price pizza: {formatCurrency(pizzaPrice)}
        </p>
        {priority && (
          <p className="text-stone600 text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(pizzaPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export default Order;
export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  if (!order.length) throw new Error(`Order ${params.orderId} does not exist `)
  return order;
}
