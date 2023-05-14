import { PrismaClient } from '@prisma/client'
import { Advancements } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type AdvancementsRouteProps = {
	advancement_id?: string
	category?: string
}

async function getAdvancements(query: AdvancementsRouteProps) {
	const advancements = await prisma.advancements.findMany({
		where: {
			advancement_id: query.advancement_id,
			category: query.category
		}
	});
	return advancements
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	getAdvancements(req.query).then((advancements) => {
		res.status(200).json(advancements);
		res.end();
	});
	prisma.$disconnect();
}