import { PrismaClient } from '@prisma/client'
import { Tags } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type TagsRouteProps = {
	tag_id?: string
	name?: string
	father_tag?: string
}

async function getTags(query: TagsRouteProps) {
	const tags = await prisma.tags.findMany({
		where: {
			tag_id: query.tag_id,
			name: query.name,
			father_tag: query.father_tag
		}
	});
	return tags
}
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let tags = await getTags(req.query);
    prisma.$disconnect();
    res.status(200).json(tags);
    res.end();
}