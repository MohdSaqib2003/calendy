// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
    const zoomConfig = req.body;
    console.log("Req.body : ", req?.body, ": Body End ");
    try {
         const response = await axios(zoomConfig);
         res.status(200).json({ name: 'John Doe', data:response.data })

      }
      catch (err) {
        console.log("Err : ", err);
        res.status(500).json({ name: 'Saqib',err })
      }
  }
  