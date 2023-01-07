//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import GameCard from './GameCard';
import { useState } from 'react';
export default function GameGrid(props: { games: Game[], adminMode?: boolean }) {

    const [existingGames, setExistingGames] = useState(props.games);
    const [genreFilter, setGenreFilter] = useState("All");

    const handleDeleteGame = (id: number) => {
        console.log(id);
        fetch(`/api/games/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => {
            setExistingGames(props.games.filter((game: Game) => game.id !== id));
        });
    };

    return (
        <div className="mx-4 my-4">
            <h2 className="text-2xl font-bold text-center">Games</h2>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Genre</label>
                <select className="border border-gray-300 rounded-md p-2" onChange={(e) => setGenreFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Fighting">Fighting Game</option>
                    <option value="Platformer">Racing</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Role Playing Game">Role Playing Game</option>
                    <option value="Adventure">Adventure</option>
                </select>
            </div>
            <hr className="h-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {existingGames.map((game: Game) => (
                    <>
                        {genreFilter === "All" || genreFilter === game.genre ? (
                            <GameCard key={game.id} {...game} adminMode={props.adminMode} handleDeleteGame={handleDeleteGame} />
                        ) : null}

                    </>
                ))}
            </div>
        </div>
    );
}
