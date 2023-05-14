import { PrismaClient } from '@prisma/client'
import { Blocks } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type BlocksRouteProps = {
    block_id?: string
    block_group?: string
}

async function getBlocks(query: BlocksRouteProps) {
    const block = await prisma.blocks.findMany({
        where: {
            block_id: query.block_id,
            block_group: query.block_group
        }
    });
    return block
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    getBlocks(req.query).then((blocks) => {
        res.status(200).json(blocks);
        res.end();
    });
    prisma.$disconnect();
}