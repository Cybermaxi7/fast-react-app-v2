import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, { action as createActionData } from "./features/order/CreateOrder";
import Order, { loader as searchLoader } from "./features/order/Order";
// import OrderItem from "./features/order/OrderItem";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import {action as updateOrderAction} from "./features/order/UpdateOrder"
// import {loader as editLoader} from "./features/order/EditOrders"
// import EditOrders from "./features/order/EditOrders";









const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: menuLoader, errorElement: <Error /> },
      { path: "/cart", element: <Cart /> },

      { path: "/order/new", element: <CreateOrder />, action: createActionData, },
      // {path: "/edit/:orderId", element: <EditOrders />, loader: editLoader},

      
      { path: "/order/:orderId", element: <Order />, loader: searchLoader, action: updateOrderAction  },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
