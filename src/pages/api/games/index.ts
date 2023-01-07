// NEXTJS api endpoint to handle request for games. Handler should account for fetch request to get all games using prisma
// import prisma client
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import type { Game } from "@prisma/client"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const games: Game[] = await prisma.game.findMany();
    res.json(games);
}
