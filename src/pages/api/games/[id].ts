import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db"
import type { Game } from "@prisma/client"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Fetch record by ID
    if (req.method === 'GET') {
        const { id } = req.query;
        const game = await prisma.game.findUnique({
            where: { id: Number(id) },
        });
        res.json(game);
    }
    //DELETE record by ID
    else if (req.method === 'DELETE') {
        const { id } = req.query;
        const game = await prisma.game.delete({
            where: { id: Number(id) },
        });
        res.json(game);
    }
    //UPDATE record by ID
    else if (req.method === "PATCH") {
        const { id } = req.query;
        const game = await prisma.game.update({
            where: { id: Number(id) },
            data: req.body,
        });
        res.json(game);
    }
}
