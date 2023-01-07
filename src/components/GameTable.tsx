//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import { useEffect, useState } from 'react';
export default function GameTable({ adminMode }: { adminMode: boolean }) {
    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        fetch("/api/games/").then((res) => res.json()).then((data) => { console.log(data); setGames(data) });
    }, []);

    const handleDeleteGame = (id: number) => {
        fetch(`/api/games/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            setGames(games.filter((game) => game.id !== id));
        });
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Games</h2>
            <hr className="h-10" />

            <table className="table-auto ">
                <thead>
                    <tr >
                        <th className="px-4 py-2">Game</th>
                        <th className="px-4 py-2">Genre</th>
                        <th className="px-4 py-2">Rating</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Discount</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Release Date</th>
                        {adminMode &&
                            <>
                                <th className="px-4 py-2">Edit</th>
                                <th className="px-4 py-2">Delete</th>
                            </>
                        }
                    </tr>

                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td className="border px-4 py-2">{game.name}</td>
                            <td className="border px-4 py-2">{game.genre}</td>
                            <td className="border px-4 py-2">{game.rating}</td>
                            <td className="border px-4 py-2">{game.price}</td>
                            <td className="border px-4 py-2">{game.discount}% OFF</td>
                            <td className="border px-4 py-2">{Math.round(game.price - game.price * (game.discount / 100))}</td>
                            <td className="border px-4 py-2">{new Date(game.releaseDate).toLocaleDateString()}</td>
                            {adminMode &&
                                <>
                                    <td className="border px-4 py-2">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Edit
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteGame(game.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </>
                            }
                        </tr>
                    ))}
                </tbody>
            </table >
        </div>
    );
}
