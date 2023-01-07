//React functional component that will fetch each game from the database and display it in a table using tailwind styling
import type { Game } from '@prisma/client'
import GameCard from './GameCard';
import { useState } from 'react';
import Swal from 'sweetalert2';
export default function GameGrid(props: { games: Game[], adminMode?: boolean }) {

    const [existingGames, setExistingGames] = useState(props.games);
    const [genreFilter, setGenreFilter] = useState("All");
    const [pageNumber, setPageNumber] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);

    const handleDeleteGame = (id: number) => {
        fetch(`/api/games/${id}`, {
            method: "DELETE",
        }).then((res) => res.json()).then((data) => {
            setExistingGames(props.games.filter((game: Game) => game.id !== id));
        });
    };
    const handleEditGame = (id: number) => {

        Swal.fire({
            title: 'Edit Game',
            html: `
            <div class="flex flex-col">
            <label for="swal-input1">Name</label>
            <input id="swal-input1" class="swal2-input" placeholder="Game Name" value="${existingGames.find((game: Game) => game.id === id)?.name}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input2">Genre</label>
            <input id="swal-input2" class="swal2-input" placeholder="Game Genre" value="${existingGames.find((game: Game) => game.id === id)?.genre}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input3">Rating</label>
            <input id="swal-input3" class="swal2-input" placeholder="Game Rating" value="${existingGames.find((game: Game) => game.id === id)?.rating}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input4">Price</label>
            <input id="swal-input4" class="swal2-input" placeholder="Game Price" value="${existingGames.find((game: Game) => game.id === id)?.price}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input5">Discount</label>
            <input id="swal-input5" class="swal2-input" placeholder="Game Discount" value="${existingGames.find((game: Game) => game.id === id)?.discount}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input6">Release Date</label>
            <input id="swal-input6" class="swal2-input" placeholder="Game Release Date" value="${existingGames.find((game: Game) => game.id === id)?.releaseDate}">
            </div>
            <div class="flex flex-col">
            <label for="swal-input7">Image URL</label>
            <input id="swal-input7" class="swal2-input" placeholder="Game Image URL" value="${existingGames.find((game: Game) => game.id === id)?.image_url}">
            </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    (document.getElementById('swal-input1') as HTMLInputElement).value,
                    (document.getElementById('swal-input2') as HTMLInputElement).value,
                    (document.getElementById('swal-input3') as HTMLInputElement).value,
                    (document.getElementById('swal-input4') as HTMLInputElement).value,
                    (document.getElementById('swal-input5') as HTMLInputElement).value,
                    (document.getElementById('swal-input6') as HTMLInputElement).value,
                    (document.getElementById('swal-input7') as HTMLInputElement).value,
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const [name, genre, rating, price, discount, releaseDate, image_url] = result.value;
                fetch(`/api/games/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        genre,
                        rating: parseInt(rating),
                        price: parseInt(price),
                        discount: parseInt(discount),
                        releaseDate: new Date(releaseDate).toISOString(),
                        image_url
                    })
                }).then((res) => res.json()).then((data) => {
                    //Update the record in the existing games array
                    setExistingGames(existingGames.map((game: Game) => {
                        if (game.id === id) {
                            return data;
                        } else {
                            return game;
                        }
                    }
                    ));
                });
            }
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
            <div className="h-10 bg-gray-100 my-2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentPageGames.map((game: Game) => (
                    <GameCard
                        key={game.id}
                        {...game}
                        adminMode={props.adminMode}
                        handleDeleteGame={handleDeleteGame}
                        handleEditGame={handleEditGame}
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
