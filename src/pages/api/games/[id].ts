import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db"
import type { Game } from "@prisma/client"

//Api endpoint for /api/game. Should include a GET request by ID and a POST request to create a new game.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const game = await prisma.game.findUnique({
            where: { id: Number(id) },
        });
        res.json(game);
    }
    else if (req.method === 'DELETE') {
        const { id } = req.query;
        const game = await prisma.game.delete({
            where: { id: Number(id) },
        });
        res.json(game);
    }
}
