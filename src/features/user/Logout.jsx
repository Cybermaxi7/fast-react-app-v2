import { useDispatch } from "react-redux";
import { logoutUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../cart/cartSlice";

export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function logOut() {
        dispatch(logoutUser());
        dispatch(clearCart());
        navigate('/')
    }
  return (
    <button className="absolute bottom-16 right-4 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl bg-yellow-400/60 px-4 py-2 hover:bg-yellow-400 transition-all duration-300 ease" onClick={logOut}>
      Logout
    </button>
  );
}
