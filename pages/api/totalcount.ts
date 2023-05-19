import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

type ObjCountRouteOutput = {
    items_count: number
    blocks_count: number
    advancements_count: number
    tags_count: number
    recipes_count: number
}

async function getObjCount() {
    const blocks_count = await prisma.blocks.count();
    const items_count = await prisma.items.count();
    const advancements_count = await prisma.advancements.count();
    const tags_count = await prisma.tags.count();
    const recipes_count = await prisma.recipes.count();
    return { items_count, blocks_count, advancements_count, tags_count, recipes_count }
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let count = await getObjCount();
    let objCount: ObjCountRouteOutput = {
        items_count: count.items_count,
        blocks_count: count.blocks_count,
        advancements_count: count.advancements_count,
        tags_count: count.tags_count,
        recipes_count: count.recipes_count
    }
    res.status(200).json(objCount);
    prisma.$disconnect();

}