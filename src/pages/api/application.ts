/*
import { NextApiRequest,NextApiResponse } from "next";
import {prisma } from '../../lib/prisma'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
        const {jobId,freelancerId,coverLetter,price} =req.body
        const application = await prisma.application.create({data:{jobId,freelancerId,coverLetter,price}})
        return res.status(201).json(application)
    }
    res.status(405).end()
}

*/

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { jobId, freelancerId, coverLetter, price } = req.body;

  if (!jobId || !freelancerId || !price) {
    return res.status(400).json({ error: "Missing required fields: jobId, freelancerId, or price" });
  }

  try {
    const application = await prisma.application.create({
      data: {
        jobId,
        freelancerId,
        coverLetter, // optional, included if provided
        price,
      },
    });

    return res.status(201).json(application);
  } catch (error) {
    console.error("Failed to create application:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
