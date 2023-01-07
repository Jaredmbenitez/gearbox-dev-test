// Admins should have the option to add, edit and delete from the list of games.
import { type NextPage } from "next";
import GameGrid from "../../components/GameGrid";
import AddGameForm from "../../components/AddGameForm";
const Admin: NextPage = ({ games }) => {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center ">
                <div className="grid-cols-1 grid">
                    <GameGrid games={games} adminMode={true} />
                    <div className="h-10 bg-gray-100"></div>
                    <AddGameForm />
                </div>

            </main>
        </>
    );
};

export default Admin;
// Fetch games on Server before page load.
export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/games");
    const games = await res.json();
    return {
        props: {
            games,
        },
    };
}
