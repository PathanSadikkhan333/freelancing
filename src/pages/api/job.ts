import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
       const {jobId,freelancerId,coverletter,price} =req.body
       const application = await prisma.application.create({data:{jobId,freelancerId,price}})
       return res.status(201).json(application)

    }
}