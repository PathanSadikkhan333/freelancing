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
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { jobId, freelancerId, coverLetter, price } = req.body;

    // Basic validation (add more as needed)
    if (!jobId || !freelancerId || !coverLetter || price === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const application = await prisma.application.create({
      data: { jobId, freelancerId, coverLetter, price },
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json(application);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
