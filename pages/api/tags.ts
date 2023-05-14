import { PrismaClient } from '@prisma/client'
import { Tags } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type TagsRouteProps = {
	tag_id?: string
	name?: string
}

async function getTags(query: TagsRouteProps) {
	const tags = await prisma.tags.findMany({
		where: {
			tag_id: query.tag_id,
			name: query.name
		}
	});
	return tags
}
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    getTags(req.query).then((tags) => {
        res.status(200).json(tags);
    });
    prisma.$disconnect();
}   