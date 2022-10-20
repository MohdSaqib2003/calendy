// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs'

export default async function handler(req, res) {
    const data = ["2022-10-28T08:00:00+05:30", "2022-10-29T08:00:00+05:30"]
    // const { data } = req.body;

    const path = "pages/api/file.json";

    let readData = fs.readFileSync(path, "utf-8");

    readData = JSON.parse(readData);



    console.log("start : ",typeof readData," : End");
    console.log("start : ", readData," : End");
    // const readData = fs.readFile(path, "utf8", {
    //     encoding: "utf-8",
    //     flag: "r",
    // })

    readData.push(data);
    fs.writeFileSync(path, JSON.stringify(readData))
    res.status(200).json({ name: 'Saqib' })
}
