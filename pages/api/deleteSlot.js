
import fs from 'fs'

export default async function handler(req, res) {

console.log(req.body,"jjjj")
    // const {dateToDelete} = JSON.parse((req.body));
    // console.log("P : ",dateToDelete);
    
    const dateToDelete  = JSON.parse(JSON.stringify(req.body));

    console.log("DDD : ",dateToDelete);

    const path = "pages/api/file.json";

    // console.log("Deletetet etet : ", typeof dateToDelete);
    // console.log("Deletetet etet : ", dateToDelete);

    // console.log("OOO ARR : ",Object.keys(dateToDelete)[0]);
    // console.log("OOO : ",Object.keys(dateToDelete)[0].replace(" ","+"));

    try{

    const payload  = JSON.parse(Object.keys(dateToDelete)[0].replace(/\s/g,"+"));

    // console.log("ppddd : ",payload);
    // console.log("ppddd[0] : ",payload[0]);
    // console.log("ppddd[1] : ",payload[1]);
    
    let readData = fs.readFileSync(path, "utf-8");

    console.log("Paylod : ", payload)

    readData = JSON.parse(readData);

    const modifiedArray = readData.filter((item)=>{
        // console.log("ITEM[0] : ", item[0]);
        // console.log("PAYLOAD : ", payload);
        return item[0] !== payload[0] &&  item[1] !== payload[1];
    })

    console.log("MODYYYY : ", modifiedArray);

    console.log("start : ",typeof readData," : End");
    console.log("start : ", readData," : End");

    console.log("Date to delete : ", payload)

    fs.writeFileSync(path, JSON.stringify(modifiedArray, null, 4));

    res.status(200).json({ name: 'Saqib' })
    }
    catch (err) {
        console.log("Err : ", err);
        res.status(500).json({ name: 'Saqib',err })
      }
}
