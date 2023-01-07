// Admins should have the option to add, edit and delete from the list of games.
import { type NextPage } from "next";
import GameTable from "../../components/GameTable";

const Admin: NextPage = () => {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center ">
                <GameTable adminMode={true} />
            </main>
        </>
    );
};

export default Admin;
