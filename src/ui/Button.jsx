import { Link } from "react-router-dom";

export default function Button({ children, to, type, disabled, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm ";
  const style = {
    primary: base + " " + "px-4 py-3 md:px-6 md:py-4",
    small: base + " " + "py-2 px-4 text-xs md:px-5 md:py-2.5",
    secondary:
      "inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 text-sm focus:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + "py-1 px-2.5 text-xs md:px-3.5 md:py-2 text-sm ",
  };
  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}
