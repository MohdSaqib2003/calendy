import fs from 'fs';
import moment from 'moment';

export default async function handler(req, res) {
    const path = "pages/api/file.json";

    try {
        let readData = fs.readFileSync(path, "utf-8");
        const dateObj = new Date();
        const todayDate = moment(dateObj.setDate(dateObj.getDate() - 1)).format("YYYY-MM-DD");

        readData = JSON.parse(readData);


        const newData = readData.sort(function (a, b) {
            return new Date(a[0]) - new Date(b[0]);
        })

        const removedBefore = newData?.filter((date) => {
            const sameFormatDate = moment(date[0]).format("YYYY-MM-DD");

            console.log("TOday's : ", todayDate);
            console.log("Array's : ", sameFormatDate);

            
            // return new Date(date[0]) > todayDate;
            return moment(sameFormatDate).isAfter(todayDate);;
        });

        console.log("Removed before : ", removedBefore);

        res.status(200).json({ name: 'Saqib', slots: removedBefore })
    }
    catch (err) {
        console.log("Err : ", err);
        res.status(500).json({ name: 'Saqib', err })
    }
}
