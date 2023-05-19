import type { NextApiRequest, NextApiResponse } from 'next'
import got from 'got';
const sharp = require('sharp');

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    let name: string = req.query.name as string;
    let width: number = parseInt(req.query.w as string);
    let height: number = parseInt(req.query.h as string);

    if (!name) return res.status(400).send({ error: "No name provided" });


    if (isNaN(width)) width = 800;
    if (isNaN(height)) height = 800;

    let img = got.stream(`https://raw.githubusercontent.com/Sgambe33/MinecraftAPI/main/images/${name}.png`)
    img = img.pipe(sharp().resize(width, height));
    res.setHeader('Content-Type', 'image/png');
    img.pipe(res);
}