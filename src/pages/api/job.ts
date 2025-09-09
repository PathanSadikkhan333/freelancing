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
<<<<<<< HEAD
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Destructure and validate input body parameters
      const { jobId, freelancerId, coverletter, price } = req.body;

      if (!jobId || !freelancerId || !price) {
        return res.status(400).json({ error: "Missing required fields: jobId, freelancerId, price" });
      }

      // Create application record in database
      const application = await prisma.application.create({
        data: {
          jobId,
          freelancerId,
          price,
          coverletter // add coverletter if it exists in your prisma schema
        }
      });

      // Explicitly set JSON content type header
      res.setHeader('Content-Type', 'application/json');
      
      // Respond with created application JSON and status 201
      return res.status(201).json(application);

    } catch (error) {
      console.error("Error creating application:", error);
      // Return JSON error response on failure
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Method not allowed handler for other HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
=======
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
>>>>>>> 5f89c89cb0f0338191579c843d24d79e05ee9172
  }
}
