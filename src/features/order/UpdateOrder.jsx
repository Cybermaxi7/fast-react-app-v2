import { useFetcher } from "react-router-dom";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  console.log(params.orderId);
  const order = await getOrder(params.orderId);
  console.log(order);
  const { pizzaPrice } = order[0];
  const data = {
    priority: true,
    priorityPrice: pizzaPrice * 0.2,
    totalPrice: (pizzaPrice * 0.2) + pizzaPrice,
  };
  await updateOrder(params.orderId, data);
  return null;
}
