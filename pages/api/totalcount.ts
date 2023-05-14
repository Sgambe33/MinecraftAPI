import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
const sharp = require('sharp')
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

const filePath = path.resolve('.', 'acacia_boat.png')

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // getObjCount().then((count) => {
    //     let objCount: ObjCountRouteOutput = {
    //         items_count: count.items_count,
    //         blocks_count: count.blocks_count,
    //         advancements_count: count.advancements_count,
    //         tags_count: count.tags_count,
    //         recipes_count: count.recipes_count
    //     }
    //     res.status(200).json(objCount);
    // });
    //resize image
    let width: number = parseInt(req.query.w as string);
    let height: number = parseInt(req.query.h as string);
    const imageBuffer = await sharp(filePath)
        .resize(width, height)
    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)

    prisma.$disconnect();

}