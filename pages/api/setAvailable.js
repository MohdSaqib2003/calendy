// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs'

export default async function handler(req, res) {
    // const pqayload = ["2022-10-28T08:00:00+05:30", "2022-10-29T08:00:00+05:30"]
    const payload  = req.body;

    const path = "pages/api/file.json";

    let readData = fs.readFileSync(path, "utf-8");

    readData = JSON.parse(readData);

    readData.push(payload);
    fs.writeFileSync(path, JSON.stringify(readData, null, 4))
    res.status(200).json({ name: 'Saqib' })
}
