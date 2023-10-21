// import {useLoaderData } from "react-router-dom"
// import { getOrder } from "../../services/apiRestaurant"
// import { useDispatch, useSelector } from "react-redux"
// import Button from "../../ui/Button"
// import { addItem, getCart } from "../cart/cartSlice"

// export default function EditOrders() {
//     const oldOrder = useLoaderData()
//     const order = oldOrder[0]
//     console.log(order)
//     const cart = JSON.parse(order.cart)
//     console.log(cart[0])
//     const dispatch = useDispatch()
//     function handleGoToCart() {
//         dispatch(addItem(cart[0]))
//     }
//     const cartStore= useSelector(getCart)
//     console.log(cartStore)
//     return (
//         <div>
//            <Button type="primary" onClick={handleGoToCart}>Go to cart</Button> 
//         </div>
//     )
// }
// export async function loader({params}) {
//     const order = await getOrder(params.orderId)
//     return order
// }
