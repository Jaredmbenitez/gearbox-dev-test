// Admins should have the option to add, edit and delete from the list of games.
import { type NextPage } from "next";
import GameTable from "../../components/GameTable";
import AddGameForm from "../../components/AddGameForm";
const Admin: NextPage = () => {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center ">
                <div className="grid-cols-1 grid">
                    <GameTable adminMode={true} />
                    {/*  dividier with margin*/}
                    <div className="h-10 bg-gray-100"></div>
                    <AddGameForm />
                </div>

            </main>
        </>
    );
};

export default Admin;
