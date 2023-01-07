// NEXTJS api endpoint to handle request for games. Handler should account for fetch request to get all games using prisma

const handler = async (req, res) => {
    const games = await prisma.game.findMany();
    res.json(games);
}
