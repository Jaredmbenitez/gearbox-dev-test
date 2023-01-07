
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
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(name, genre, price, discount, releaseDate, rating, imageURL);
        fetch("/api/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                name: name,
                genre: genre,
                price: price,
                discount: discount,
                releaseDate: new Date(releaseDate).toISOString(),
                rating: rating,
                image_url: imageURL
            }
            ),
        }).then((res) => { console.log(res) })
    };
    return (
        <form onSubmit={handleSubmit} className="mx-4 my-4 p-4 border border-gray-300 rounded" >
            <h3 className="text-2xl font-bold text-center">Add a new game</h3>
            <div className="grid grid-cols-1">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Genre</label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option disabled value="">Select a genre</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Role Playing Game">Role Playing Game</option>
                        <option value="Adventure">Adventure</option>
                    </select>

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
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Image" onChange={(e) => setImageURL(e.target.value)} />
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
