import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchOrder() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
    navigate(`order/${query}`)
    setQuery("")
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter Order #..." onChange={(e) => setQuery(e.target.value)} value={query} className="rounded-full px-4 py-2 text-sm bg-yellow-100 placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50"/>
        </form>
    )
}

