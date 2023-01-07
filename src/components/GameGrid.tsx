//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import GameCard from './GameCard';
import { useState } from 'react';
export default function GameGrid(props: { games: Game[], adminMode?: boolean }) {

    const [existingGames, setExistingGames] = useState(props.games);
    const [genreFilter, setGenreFilter] = useState("All");
    const [pageNumber, setPageNumber] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);

    const handleDeleteGame = (id: number) => {
        console.log(id);
        fetch(`/api/games/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => {
            setExistingGames(props.games.filter((game: Game) => game.id !== id));
        });
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGenreFilter(event.target.value);
        setPageNumber(1); // reset page number when genre is changed
    }

    const handleNextButtonClick = () => {
        setPageNumber(pageNumber + 1);
    }

    const handlePrevButtonClick = () => {
        setPageNumber(pageNumber - 1);
    }

    const filteredGames = genreFilter === 'All'
        ? existingGames
        : existingGames.filter(game => game.genre === genreFilter);

    const lastGameIndex = pageNumber * gamesPerPage;
    const firstGameIndex = lastGameIndex - gamesPerPage;
    const currentPageGames = filteredGames.slice(firstGameIndex, lastGameIndex);

    return (
        <div className="mx-4 my-4">
            <h2 className="text-2xl font-bold text-center">Games</h2>
            <div className="flex flex-col">
                <label className="text-xl font-bold">Genre</label>
                <select
                    className="border border-gray-300 rounded-md p-2"
                    value={genreFilter}
                    onChange={handleGenreChange}
                >
                    <option value="All">All</option>
                    <option value="Fighting">Fighting Game</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Role Playing Game">Role Playing Game</option>
                    <option value="Adventure">Adventure</option>
                </select>
            </div>
            <hr className="h-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentPageGames.map((game: Game) => (
                    <GameCard
                        key={game.id}
                        {...game}
                        adminMode={props.adminMode}
                        handleDeleteGame={handleDeleteGame}
                    />
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    className="py-2 px-4 bg-gray-300 rounded-md"
                    disabled={pageNumber === 1}
                    onClick={handlePrevButtonClick}
                >
                    Previous
                </button>
                <span className="text-xl font-bold">{pageNumber}</span>
                <button
                    className="py-2 px-4 bg-gray-300 rounded-md"
                    disabled={lastGameIndex >= filteredGames.length}
                    onClick={handleNextButtonClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
