import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id, name } = req.query;
    console.log("Incoming request:", req.query);

    if (id && id !== "undefined") {
      try {
        const playerSingle = await prisma.user.findUnique({
          where: {
            id: parseInt(id, 10),
          },
        });

        if (!playerSingle) {
          return res.status(404).json({ error: "Player not found." });
        }

        return res.status(200).json(playerSingle);
      } catch (error) {
        console.error("Error fetching the player by ID:", error);
        return res.status(500).json({
          error: `Failed to fetch the single player. Reasons: ${error.message}`,
        });
      }
    } else if (name) {
      try {
        const playerSingle = await prisma.user.findFirst({
          where: {
            name: {
              equals: name,
            },
          },
        });

        if (!playerSingle) {
          return res.status(404).json({ error: "Player not found." });
        }

        return res.status(200).json(playerSingle);
      } catch (error) {
        console.error("Error fetching the player by name:", error);
        return res.status(500).json({
          error: `Failed to fetch the single player. Reasons: ${error.message}`,
        });
      }
    }
  }
}
