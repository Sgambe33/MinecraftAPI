import { PrismaClient } from '@prisma/client'
import { Items } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type ItemsRouteProps = {
    item_id?: string
    item_group?: string
}

async function getItems(query: ItemsRouteProps) {
    const item = await prisma.items.findMany({
        where: {
            item_id: query.item_id,
            item_group: query.item_group
        },
        include: {
            tags: true
        }
    });
    return item
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let items = await getItems(req.query);
    prisma.$disconnect();
    res.status(200).json(items);
    res.end();
}