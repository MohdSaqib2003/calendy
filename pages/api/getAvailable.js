import fs from 'fs'

export default async function handler(req, res) {
    const path = "pages/api/file.json";

    try {
        let readData = fs.readFileSync(path, "utf-8");
        readData = JSON.parse(readData);
        res.status(200).json({ name: 'Saqib', slots: readData })
    }
    catch (err) {
        console.log("Err : ", err);
        res.status(500).json({ name: 'Saqib', err })
    }
}
