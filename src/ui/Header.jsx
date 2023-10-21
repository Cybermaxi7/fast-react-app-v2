import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="border-b flex items-center justify-between border-stone-200 bg-yellow-400 px-4 sm:px-6 py-3 uppercase font-bold">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />

      <Username />
    </header>
  );
}
