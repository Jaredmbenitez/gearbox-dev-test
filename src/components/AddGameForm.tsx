
//Form to add a new game to the database
//The form should include name,genre,price,discount,releaseDate,rating
import { useState } from "react";
export default function AddGameForm() {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [releaseDate, setReleaseDate] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(name, genre, price, discount, releaseDate, rating);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center">Add a new game</h3>
            <div className="grid grid-cols-1">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Discount</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Discount" value={discount} onChange={(e) => setDiscount(parseInt(e.target.value))} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Release Date</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date" placeholder="Release Date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} />
                </div>
                <div className="flex items-center justify-between my-4">
                    <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Game
                    </button>
                </div>
            </div>
        </form >
    )

}
