//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import GameCard from './GameCard';
import { useState } from 'react';
export default function GameGrid(props: { games: Game[], adminMode?: boolean }) {

    const [existingGames, setExistingGames] = useState(props.games);
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
            <hr className="h-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {existingGames.map((game: Game) => (
                    <>
                        <GameCard key={game.id} {...game} adminMode={props.adminMode} handleDeleteGame={handleDeleteGame} />
                    </>
                ))}
            </div>
        </div>
    );
}
