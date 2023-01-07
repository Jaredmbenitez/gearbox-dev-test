import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import type { Game } from "@prisma/client"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Fetch all records
    if (req.method === "GET") {
        const games: Game[] = await prisma.game.findMany();
        res.json(games);
    }
    //CREATE new record
    else if (req.method === "POST") {
        const { name, genre, price, discount, releaseDate, rating, image_url } = req.body;
        const game: Game = await prisma.game.create({
            data: {
                name,
                genre,
                price,
                discount,
                releaseDate,
                rating,
                image_url
            }
        });
        res.json(game);
    }
}
