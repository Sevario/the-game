import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const result = await prisma.Inventory.findMany({
                where: {
                    user_id: userId,
                },
            });

            if (!result) {
                res.status(404).json({ error: `No inventory found for the specified user` });
                return;
            }

            let inventory = result[0].inventory;

            let updateNeeded = false;
            if (!inventory) {
                inventory = JSON.stringify(new Array(24).fill(null));
                updateNeeded = true;
            } else {
                console.log(inventory);
                inventory = JSON.parse(inventory);
            }
            // console.log(inventory, 'this is inventory on fill');

            // This here is updating the table column to an Array(24).fill(null)
            if (updateNeeded) {
                await prisma.Inventory.update({
                    where: {
                        user_id: userId,
                    },
                    data: {
                        inventory: inventory,
                    }
                });
            }

            res.json({ result });

        } catch (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'An error occurred while fetching data from the database' });
        }
    }
}