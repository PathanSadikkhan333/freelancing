import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
        const {jobId,amount,currency}=req.body
        return res.json({ok:true,checkout:{provider:"razopay",orderId:"order_xxx"}})
    }
    res.status(405).end()
}