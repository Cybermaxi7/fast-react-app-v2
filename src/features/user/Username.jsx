import { useSelector } from "react-redux";
import { getUser } from "../cart/cartSlice";

export default function Username() {
  const username = useSelector(getUser);
  if (!username) return;
  return (
    <div className="hidden text-sm font-semibold md:block ">{username}</div>
  );
}
