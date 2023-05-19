import { PrismaClient } from '@prisma/client'
import { Recipes } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

type RecipesRouteProps = {
    output?: string
    recipe_type?: string
}

async function getRecipes(query: RecipesRouteProps) {
    const recipes = await prisma.recipes.findMany({
        where: {
            OR: [
                {
                    output_block: {
                        equals: query.output
                    },
                },
                {
                    output_item: {
                        equals: query.output
                    },
                },
            ],
            recipe_type: query.recipe_type
        }
    });
    return recipes
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let recipes = await getRecipes(req.query);
    prisma.$disconnect();
    res.status(200).json(recipes);
    res.end();
}