/*
import { NextApiRequest,NextApiResponse } from "next";
import {prisma} from '../../lib/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === 'POST'){
       const {jobId,freelancerId,coverletter,price} =req.body
       const application = await prisma.application.create({data:{jobId,freelancerId,price}})
       return res.status(201).json(application)

    }
}
*/

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing or invalid job ID" });
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
